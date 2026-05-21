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

## 📸 App Interface Walkthrough

### 🏠 1. Landing Portal & Onboarding
An intuitive entry point built with a clean aesthetic to ease patient anxiety and offer instant navigation paths.
![OncoTrack Home](screenshots/home.jpg)

### 🔐 2. Dual-Role Authentication & Secure Registration
Separate validation portals for healthcare providers and patients, utilizing structured data input validation.
| Secure Login Portal | Account Creation View |
| :---: | :---: |
| ![Login](screenshots/login.jpg) | ![Registration](screenshots/register1.jpg) |

*Full registration details captured securely:*
![Registration Part 2](screenshots/screenshots/register2.jpg)

### 👨‍⚕️ 3. Clinician Dashboard & Real-Time Analytics
Authorized clinicians gain immediate operational oversight with automated data visualization for stages and patient statuses via interactive charts.
![Clinician Overview](screenshots/clinician-dash1.jpg)
![Dynamic Records List](screenshots/clinician-dash2.jpg)

### 📝 4. Clinical CRUD Operations (Patient Intake & Logs)
A dynamic, split-form management modal allowing clinicians to seamlessly provision unique Patient IDs, map diagnoses, configure treatment strategies, and log vital updates.
![Patient Entry Top](screenshots/patient-entry1.jpg)
![Patient Entry Bottom](screenshots/patient-entry2.jpg)

### 🩺 5. Patient Access Portal
A clean, read-only dashboard layout explicitly engineered for individual patients to safely review their verified diagnoses, track upcoming appointment timelines, and monitor daily prescription frequency.
![Patient Portal View](screenshots/patient-portal.jpg)

```text
OncoTrack/
├── backend/            # Express server, database configurations, schemas, and API routes
├── frontend/           # Vite-React frontend source code, components, and custom UI views
├── assets/             # Project screenshots and visual mockups for documentation
└── README.md           # Main project portal documentation
