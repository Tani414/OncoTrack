import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import records from "./routes/record.js";

// Load environment variables immediately
// Replace dotenv.config(); with this:
dotenv.config({ path: "./config.env" });

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());

// This creates the /record prefix
app.use("/record", records);

// Simple diagnostic route
app.get("/", (req, res) => res.send("Server is running. Try /record/ping"));

app.listen(PORT, () => {
  console.log(`🚀 Server active on http://localhost:${PORT}`);
});