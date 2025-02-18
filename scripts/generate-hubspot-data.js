import { Client } from "@hubspot/api-client";
import dotenv from "dotenv";
import { promises as fs } from "fs";
import path from "path";
import { exists } from "./utils.js";

dotenv.config();

const SPYDER_PIPELINE_ID = "691999256";
let lastAvailable = false;

async function getLastAvailableData() {
  try {
    console.log("Checking for existing HubSpot data...");
    const currentData = await fs.readFile(
      path.join(process.cwd(), "static", "data", "hubspot.json"),
      "utf-8",
    );
    const data = JSON.parse(currentData);
    return data;
  } catch (error) {
    console.log("No previous data available");
    return null;
  }
}

function reduceDeals(deals) {
  return deals.reduce(
    (acc, deal) => acc + (parseFloat(deal?.properties?.amount) || 0),
    0,
  );
}

async function fetchHubSpotData() {
  const token = process.env.VITE_HUBSPOT_TOKEN;

  // First check if we have a token
  if (!token) {
    // Check for existing data
    const existingData = await getLastAvailableData();
    if (existingData) {
      console.log(`No HubSpot token available. Using existing data from ${existingData.lastUpdated}`);
      return null; // Signal that we should keep existing data
    }
    throw new Error("No HubSpot token and no existing data found");
  }

  // If we have a token, proceed with fetching new data
  const hubspotClient = new Client({ accessToken: token });

  let pipelineDealsFilter = {
    filterGroups: [
      {
        filters: [
          { propertyName: "amount", operator: "HAS_PROPERTY" },
          {
            propertyName: "pipeline",
            operator: "CONTAINS_TOKEN",
            value: SPYDER_PIPELINE_ID,
          },
        ],
      },
    ],
    properties: ["dealname", "amount", "pipeline"],
    limit: 100,
  };

  let pipelineDeals = [];
  let monthlyDeals = [];
  let oneTimeDeals = [];
  let after = undefined;

  try {
    do {
      pipelineDealsFilter.after = after;
      const res = await hubspotClient.crm.deals.searchApi.doSearch(
        pipelineDealsFilter,
      );
      pipelineDeals = pipelineDeals.concat(res.results);

      monthlyDeals = monthlyDeals.concat(
        res.results.filter((deal) =>
          deal.properties.dealname.toLowerCase().includes("monthly")
        ),
      );

      oneTimeDeals = oneTimeDeals.concat(
        res.results.filter((deal) =>
          deal.properties.dealname.toLowerCase().includes("one-time")
        ),
      );

      after = res.paging?.next?.after;
    } while (after);

    const totalDonations = reduceDeals(pipelineDeals);
    const totalMonthlyDonations = reduceDeals(monthlyDeals);
    const totalOneTimeDonations = reduceDeals(oneTimeDeals);

    return {
      pipelineDeals,
      monthlyDeals,
      oneTimeDeals,
      totalDonations,
      totalMonthlyDonations,
      totalOneTimeDonations,
      lastUpdated: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Error fetching HubSpot data:", error);
    throw error;
  }
}

async function generateHubSpotData() {
  try {
    // Fetch data from HubSpot
    const newData = await fetchHubSpotData();

    // If fetchHubSpotData returns null, it means we should use existing data
    if (newData === null) {
      return;
    }

    // Ensure the output directory exists
    const outputDir = path.join(process.cwd(), "static", "data");
    if (!(await exists(outputDir))) {
      await fs.mkdir(outputDir, { recursive: true });
    }

    // Write the new data to a JSON file
    const outputPath = path.join(outputDir, "hubspot.json");
    await fs.writeFile(outputPath, JSON.stringify(newData, null, 2));

    console.log(
      "HubSpot data has been successfully updated and saved to:",
      outputPath,
    );
  } catch (error) {
    console.error("Error generating HubSpot data:", error);
    process.exit(1);
  }
}

// Execute the script
generateHubSpotData();
