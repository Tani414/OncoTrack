import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Stethoscope } from "lucide-react";
import "./AppNavbar.css";

export default function AppNavbar() {
  const location = useLocation();

  return (
    <nav className="main-navbar">
      <div className="nav-brand">
        <Link to="/" className="logo-link">
          <Stethoscope size={28} className="nav-icon" />
          <span>OncoTrack</span>
        </Link>
      </div>
      
      <ul className="nav-links">
        <li><Link to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link></li>
        <li><Link to="/register" className={location.pathname === "/register" ? "active" : ""}>Register</Link></li>
        <li><Link to="/login" className={location.pathname === "/login" ? "active" : ""}>Portal Login</Link></li>
      </ul>
    </nav>
  );
}