import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Droplet,
  Waves,
  GlassWater,
  CircleDollarSign,
  Calculator,
  Bot,
} from "lucide-react";
import "./Home.css";
import Chatbot from "../components/Chatbot";

const Home: React.FC = () => {
  const [isChatbotOpen, setChatbotOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <h1>Welcome to AquaXperts</h1>
      </section>

      {/* Join Section */}
      <section className="join-section">
        <div>
          <p>
            Save water today by a member of us to tackle water related issues
          </p>
          <p>Click Join to be part of the our team to better water quality</p>
        </div>
        <Link to="/register" className="join-button">
          Join
        </Link>
      </section>

      {/* About Us Section */}
      <section className="about-us-section">
        <h2>About Us</h2>
        <p>
          AquaXperts is a platform where we offer a wide range of services
          such as water level, water quality, water leaks and more...
        </p>
        <div className="services">
          <Link
            to="/location/water-info"
            state={{ from: location.pathname, openSection: "tank-levels" }}
            className="service-card"
          >
            <div className="service-card-icon">
              <Droplet size={48} />
            </div>
            <h3>Water Levels</h3>
          </Link>
          <Link
            to="/location/water-info"
            state={{ from: location.pathname, openSection: "water-quality" }}
            className="service-card"
          >
            <div className="service-card-icon">
              <Waves size={48} />
            </div>
            <h3>Water Quality</h3>
          </Link>
          <Link
            to="/location/water-info"
            state={{ from: location.pathname, openSection: "water-leaks" }}
            className="service-card"
          >
            <div className="service-card-icon">
              <GlassWater size={48} />
            </div>
            <h3>Water Leaks</h3>
          </Link>
        </div>
      </section>

      {/* Feeds Section */}
      <section className="feeds-section">
        <h2>Feeds</h2>
        <div className="feed-cards">
          <div className="feed-card">Community Engagement</div>
          <div className="feed-card">Community Engagement</div>
          <div className="feed-card">Community Engagement</div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="resources-section">
        <h2>Resources</h2>
        <p>
          Here are but a few resources you can use in your homes to improve
          your usage of water, identify leaks, and calculate costs.
        </p>
        <div className="resource-cards">
          <Link to="/water-use-calculator" className="resource-card">
            <div className="resource-card-icon">
              <Calculator size={36} />
            </div>
            <h4>Water Use Calculator</h4>
          </Link>
          <Link to="/water-advisor" className="resource-card">
            <div className="resource-card-icon">
              <Bot size={36} />
            </div>
            <h4>Water Advisor</h4>
          </Link>
        </div>
      </section>

      {!isChatbotOpen && (
        <button
          className="chatbot-toggle-button"
          onClick={() => setChatbotOpen(true)}
        >
          ?
        </button>
      )}
      {isChatbotOpen && <Chatbot onClose={() => setChatbotOpen(false)} />}
    </div>
  );
};

export default Home;
