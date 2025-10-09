import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../ui/button";
import logo from "../assets/logo.svg"; // Replace with your actual logo path
import "./Navbar.css";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      {/* Logo + Brand */}
      <div className="navbar-logo">
        <img src={logo} alt="AquaXperts Logo" />
        <span>AquaXperts</span>
      </div>

      {/* Desktop Navigation Links */}
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/WaterQuality">Water Quality</Link></li>
        <li><Link to="/tank-analytics">Tank Levels</Link></li>
        <li><Link to="/reports">Reports</Link></li>
        <li><Link to="/community">Community</Link></li>
        <li><Link to="/about">About Us</Link></li>
      </ul>

      {/* Login Button */}
      <div className="navbar-login">
        <Button variant="primary">Login</Button>
      </div>

      {/* Mobile Menu Toggle */}
      <div className="navbar-mobile">
        <button
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            width={24}
            height={24}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {menuOpen && (
        <ul className="navbar-links-mobile">
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/water-quality" onClick={() => setMenuOpen(false)}>Water Quality</Link></li>
          <li><Link to="/tank-levels" onClick={() => setMenuOpen(false)}>Tank Levels</Link></li>
          <li><Link to="/reports" onClick={() => setMenuOpen(false)}>Reports</Link></li>
          <li><Link to="/community" onClick={() => setMenuOpen(false)}>Community</Link></li>
          <li><Link to="/about" onClick={() => setMenuOpen(false)}>About Us</Link></li>
          <li><Button variant="primary" onClick={() => setMenuOpen(false)}>Login</Button></li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
