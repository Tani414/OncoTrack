import React from "react";
import { Routes, Route } from "react-router-dom";
import AppNavbar from "./components/AppNavbar";
import Home from "./components/Home";
import Registeration from "./components/Registeration";
import Login from "./components/Login";
import PatientDashboard from "./components/PatientDashboard";
import ClinicianDashboard from "./components/ClinicianDashboard";
import ClinicianEntry from "./components/ClinicianEntry";
import "./App.css";

function App() {
  return (
    <div className="App">
      {/* Navbar stays at the top of every page */}
      <AppNavbar /> 
      
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Registeration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/patient-dashboard" element={<PatientDashboard />} />
          <Route path="/clinician-dashboard" element={<ClinicianDashboard />} />
          <Route path="/clinician-entry" element={<ClinicianEntry />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;