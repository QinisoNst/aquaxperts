import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.svg";
import "./Navbar.css";
import { auth } from "../../firebase";
import { onAuthStateChanged, User } from "firebase/auth";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      {/* Logo */}
      <Link to="/" className="navbar-logo">
        <img src={logo} alt="AquaXperts Logo" />
        <span className="navbar-title">AquaXperts</span>
      </Link>

      {/* Hamburger Menu Icon */}
      <div
        className={`navbar-toggle ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>

      {/* Desktop Links */}
      <ul className={`navbar-links ${menuOpen ? "active" : ""}`}>
        <li><Link to="/" onClick={closeMenu}>Home</Link></li>
        <li><Link to="/location/water-info" state={{ from: location.pathname }} onClick={closeMenu}>Water Info</Link></li>
        <li><Link to="/reports" onClick={closeMenu}>Reports</Link></li>
        <li><Link to="/community" onClick={closeMenu}>Community</Link></li>
        <li><Link to="/about-us" onClick={closeMenu}>About Us</Link></li>
        <li>
          {user ? (
            <Link to="/profile" onClick={closeMenu}>Profile</Link>
          ) : (
            <Link to="/login" className="login-btn" onClick={closeMenu}>
              Login
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
