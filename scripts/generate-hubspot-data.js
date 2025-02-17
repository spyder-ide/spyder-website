import { Client } from "@hubspot/api-client";
import dotenv from "dotenv";
import { promises as fs } from "fs";
import path from "path";
import { exists } from "./utils.js";

dotenv.config();
console.log("ENV:", process.env);

const SPYDER_PIPELINE_ID = "691999256";

function reduceDeals(deals) {
  return deals.reduce(
    (acc, deal) => acc + (parseFloat(deal?.properties?.amount) || 0),
    0,
  );
}

async function fetchHubSpotData() {
  const token = process.env.VITE_HUBSPOT_TOKEN;
  if (!token) {
    throw new Error("Missing HubSpot token in environment variables");
  }

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
          deal.properties.dealname.includes("Monthly")
        ),
      );

      oneTimeDeals = oneTimeDeals.concat(
        res.results.filter((deal) =>
          deal.properties.dealname.includes("One-time")
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
    const data = await fetchHubSpotData();

    // Ensure the output directory exists
    const outputDir = path.join(process.cwd(), "static", "data");
    if (!(await exists(outputDir))) {
      await fs.mkdir(outputDir, { recursive: true });
    }

    // Write the data to a JSON file
    const outputPath = path.join(outputDir, "hubspot.json");
    await fs.writeFile(outputPath, JSON.stringify(data, null, 2));

    console.log(
      "HubSpot data has been successfully downloaded and saved to:",
      outputPath,
    );
  } catch (error) {
    console.error("Error generating HubSpot data:", error);
    process.exit(1); // Exit with failure
  }
}

// Execute the script
generateHubSpotData();
