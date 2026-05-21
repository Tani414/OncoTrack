import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

// Replace dotenv.config(); with this:
dotenv.config({ path: "./config.env" });

const uri = process.env.ATLAS_URI || "";

if (!uri.startsWith("mongodb")) {
  console.error("❌ ERROR: Invalid ATLAS_URI! Check your .env file.");
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let db;
try {
  await client.connect();
  db = client.db("oncotrack");
  console.log("✅ Successfully connected to MongoDB Atlas!");
} catch (e) {
  console.error("Database connection failed:", e);
}

export default db;