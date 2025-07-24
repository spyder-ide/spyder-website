import { Client } from "@hubspot/api-client";
import dotenv from "dotenv";
import { promises as fs } from "fs";
import path from "path";
import { exists } from "./utils.js";

dotenv.config();

const SPYDER_PIPELINE_ID = "768998503";

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

  console.log("🔍 Starting HubSpot data fetch...");
  console.log("📋 Token available:", !!token);
  console.log("🔑 Token length:", token ? token.length : 0);

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
  console.log("🚀 Creating HubSpot client...");
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

  console.log("🔍 Search filter configuration:");
  console.log("  - Pipeline ID:", SPYDER_PIPELINE_ID);
  console.log("  - Properties requested:", pipelineDealsFilter.properties);
  console.log("  - Filters:", JSON.stringify(pipelineDealsFilter.filterGroups, null, 2));

  let pipelineDeals = [];
  let monthlyDeals = [];
  let oneTimeDeals = [];
  let after = undefined;
  let pageCount = 0;

  try {
    console.log("📡 Starting API calls to HubSpot...");
    
    do {
      pageCount++;
      console.log(`📄 Fetching page ${pageCount}...`);
      
      pipelineDealsFilter.after = after;
      const res = await hubspotClient.crm.deals.searchApi.doSearch(
        pipelineDealsFilter,
      );
      
      console.log(`  ✅ Page ${pageCount} results:`, res.results.length, "deals");
      
      if (res.results.length > 0) {
        console.log("  📋 Sample deal names:");
        res.results.slice(0, 3).forEach((deal, index) => {
          console.log(`    ${index + 1}. "${deal.properties.dealname}" (Amount: ${deal.properties.amount})`);
        });
      }
      
      pipelineDeals = pipelineDeals.concat(res.results);

      const pageMonthlyDeals = res.results.filter((deal) =>
        deal.properties.dealname.toLowerCase().includes("monthly")
      );
      const pageOneTimeDeals = res.results.filter((deal) =>
        deal.properties.dealname.toLowerCase().includes("one-time")
      );
      
      console.log(`  💰 Monthly deals on this page:`, pageMonthlyDeals.length);
      console.log(`  💰 One-time deals on this page:`, pageOneTimeDeals.length);

      monthlyDeals = monthlyDeals.concat(pageMonthlyDeals);
      oneTimeDeals = oneTimeDeals.concat(pageOneTimeDeals);

      after = res.paging?.next?.after;
      console.log(`  🔄 Next page available:`, !!after);
      
    } while (after);

    console.log("\n📊 Final results:");
    console.log(`  - Total pipeline deals: ${pipelineDeals.length}`);
    console.log(`  - Monthly deals: ${monthlyDeals.length}`);
    console.log(`  - One-time deals: ${oneTimeDeals.length}`);

    const totalDonations = reduceDeals(pipelineDeals);
    const totalMonthlyDonations = reduceDeals(monthlyDeals);
    const totalOneTimeDonations = reduceDeals(oneTimeDeals);

    console.log(`  - Total donations: $${totalDonations}`);
    console.log(`  - Total monthly donations: $${totalMonthlyDonations}`);
    console.log(`  - Total one-time donations: $${totalOneTimeDonations}`);

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
    console.error("❌ Error fetching HubSpot data:", error);
    console.error("Error details:", error.message);
    if (error.body) {
      console.error("API Error body:", error.body);
    }
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
