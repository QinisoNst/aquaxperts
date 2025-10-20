import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About Section */}
        <div className="footer-section">
          <h3>AquaXperts</h3>
          <p>
          Empowering rural communities with sustainable water solutions through technology and expertise.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/water-info/water-level">Water Levels</Link>
            </li>
            <li>
              <Link to="/water-info/water-quality">Water Quality</Link>
            </li>
            <li>
              <Link to="/water-info/water-leaks">Water Leaks</Link>
            </li>
            <li>
              <Link to="/community">Community</Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div className="footer-section">
          <h3>Resources</h3>
          <ul>
            <li>
              <a href="#">DIY Leak Detection</a>
            </li>
            <li>
              <a href="#">Leak Cost</a>
            </li>
            <li>
              <a href="#">Water Use Calculator</a>
            </li>
            <li>
              <a href="#">Water Advisor</a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h3>Contact Us</h3>
          <ul>
            <li>
              <i className="fas fa-envelope"></i> info@aquaxperts.org
            </li>
            <li>
              <i className="fas fa-phone"></i> +27 675 980 3482
            </li>
            <li>
              <i className="fas fa-map-marker-alt"></i> Rural Water Solutions,
              ZA-AquaXperts
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 AquaXperts - Smart Water Solutions for Rural India. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
