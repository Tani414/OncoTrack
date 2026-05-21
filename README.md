# OncoTrack 🩺

OncoTrack is a secure, full-stack medical record management system designed to digitalize and streamline fragmented oncology workflows. Built with the **MERN stack**, the platform bridges the communication gap between healthcare providers and patients by replacing outdated paper logging with a centralized, high-performance digital dashboard.

---

## 🚀 Key Features

* 🛡️ **Role-Based Authentication:** Differentiates secure entry points for **Clinicians** (authorized to create, read, update, and delete logs) and **Patients** (read-only access to their specific treatment updates) via secure JWT-protected login logic.
* 🆔 **Automated Patient Tracking:** Implements automated, collision-free Patient ID generation (e.g., `PAT-101`) to eliminate medical record mix-ups during intensive care cycles.
* 📊 **Visual Analytics Engine:** Integrated interactive data visualization charts built with **Recharts** to display real-time clinical demographics, such as cancer stage distribution (Stages I–IV) and active vs. discharged numbers.
* 🧠 **Anxiety-Reducing UX:** Features a modern "glassmorphism" visual theme crafted entirely with custom, lightweight **Vanilla CSS** to reduce clinical coldness and ease patient stress during navigation.

---

## 🛠️ Technical Architecture & Stack

### **Frontend**
- **React.js (Vite):** Constructed using functional components, modern Hooks, and a highly modular components directory split cleanly into dedicated layout dashboards.
- **Data Visualization:** Recharts API.
- **Styling:** Custom Vanilla CSS.

### **Backend**
- **Node.js & Express.js:** Scalable RESTful API architecture structured across independent controller, model, route, and middleware layers.
- **Database:** MongoDB Atlas (NoSQL) utilizing Mongoose for schema enforcement and deep relational data integrity.
- **Security:** JSON Web Tokens (JWT) for session authentication and password encryption.

---

## 📸 Screenshots

### 🔐 Secure Role-Based Authentication
![Login Screen](screenshots/login.png)

### 🖥️ Clinician Dashboard (Patient Records & CRUD Operations)
![Clinician Dashboard](screenshots/dashboard.png)

### 📊 Visual Analytics Engine (Data Insights via Recharts)
![Analytics Dashboard](screenshots/analytics.png)

### 🩺 Patient Access Portal (Read-Only Medical Logs)
![Patient Portal](screenshots/patient-view.png)

## 📁 Repository Structure

```text
OncoTrack/
├── backend/            # Express server, database configurations, schemas, and API routes
├── frontend/           # Vite-React frontend source code, components, and custom UI views
├── assets/             # Project screenshots and visual mockups for documentation
└── README.md           # Main project portal documentation
