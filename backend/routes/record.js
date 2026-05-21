import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// 1. DIAGNOSTIC PING
router.get("/ping", (req, res) => {
  console.log("Health Check: Ping received at", new Date().toLocaleTimeString());
  res.status(200).send("Backend is reachable!");
});

// 2. USER REGISTRATION
router.post("/register", async (req, res) => {
  try {
    console.log("--- REGISTRATION ATTEMPT ---");
    console.log("Data Received:", req.body);

    const { role, email } = req.body;
    const collection = db.collection(role === "clinician" ? "users" : "patients");

    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      console.warn(`Registration Denied: ${email} already exists.`);
      return res.status(400).json({ error: "User already exists with this email." });
    }

    const newUser = { ...req.body, createdAt: new Date() };
    const result = await collection.insertOne(newUser);
    
    console.log("✅ User Registered Successfully. New ID:", result.insertedId);
    res.status(201).json({ 
      message: "Registration successful", 
      generatedID: result.insertedId 
    });
  } catch (err) {
    console.error("❌ Register Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 3. USER LOGIN
router.post("/login", async (req, res) => {
  try {
    console.log("--- LOGIN ATTEMPT ---");
    console.log(`Email: ${req.body.email}, Role: ${req.body.role}`);

    const { role, email, password } = req.body;
    const collection = db.collection(role === "clinician" ? "users" : "patients");
    const user = await collection.findOne({ email, password });

    if (!user) {
      console.warn("❌ Login Failed: Invalid Credentials.");
      return res.status(401).json({ error: "Invalid email or password." });
    }

    console.log("✅ Login Successful for:", user.name);
    res.status(200).json({ user });
  } catch (err) {
    console.error("❌ Login Route Error:", err);
    res.status(500).json({ error: "Login failed." });
  }
});

// 4. SEARCH DOCTORS
router.get("/search-doctor", async (req, res) => {
  try {
    console.log(`Searching for Doctor: "${req.query.name}"`);
    const doctors = await db.collection("users").find({
      role: "clinician",
      name: { $regex: req.query.name, $options: "i" }
    }).project({ name: 1, _id: 1 }).limit(5).toArray();
    
    console.log(`Found ${doctors.length} doctors.`);
    res.status(200).json(doctors);
  } catch (err) {
    console.error("❌ Search Error:", err);
    res.status(500).json({ error: "Search failed." });
  }
});

// 5. FINALIZE CLINICAL ENTRY (Crucial for debugging your DB issue)
router.post("/entry", async (req, res) => {
  try {
    console.log("--- NEW CLINICAL ENTRY RECEIVED ---");
    console.log("Payload:", req.body);

    const { 
      patientId, clinicianId, diagnosis, medication, 
      dosage, frequency, nextAppointment, medHistory, notes, status 
    } = req.body;

    const newEntry = {
      patientId, clinicianId, diagnosis, medication,
      dosage, frequency, nextAppointment, medHistory,
      notes, status, date: new Date().toISOString()
    };

    // Save to collection
    const result = await db.collection("clinical_entries").insertOne(newEntry);
    
    console.log("✅ ENTRY SAVED SUCCESSFULLY");
    console.log("Collection: clinical_entries");
    console.log("Database Name:", db.databaseName); // Verified DB name
    console.log("Inserted Document ID:", result.insertedId);

    res.status(201).json({ message: "Record Saved", id: result.insertedId });
  } catch (err) {
    console.error("❌ DATABASE INSERT ERROR:", err);
    res.status(500).json({ error: "Could not save clinical record" });
  }
});

// 6. PATIENT HISTORY
router.get("/my-records/:patId", async (req, res) => {
  try {
    console.log(`Fetching records for Patient ID: ${req.params.patId}`);
    const results = await db.collection("clinical_entries").find({ 
      patientId: req.params.patId 
    }).sort({ date: -1 }).toArray();
    
    console.log(`Retrieved ${results.length} records.`);
    res.status(200).json(results);
  } catch (err) {
    console.error("❌ Fetch Records Error:", err);
    res.status(500).json({ error: "Failed to fetch medical history." });
  }
});


// 7. GET ENTRIES BY CLINICIAN ID
router.get("/by-clinician/:docId", async (req, res) => {
  try {
    console.log(`Fetching records created by Clinician ID: ${req.params.docId}`);
    const results = await db.collection("clinical_entries").find({ 
      clinicianId: req.params.docId 
    }).sort({ date: -1 }).toArray();
    
    console.log(`✅ Retrieved ${results.length} records for clinician.`);
    res.status(200).json(results);
  } catch (err) {
    console.error("❌ Fetch Clinician Records Error:", err);
    res.status(500).json({ error: "Failed to fetch records for dashboard." });
  }
});

export default router;