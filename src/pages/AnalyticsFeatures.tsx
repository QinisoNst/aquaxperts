import React from 'react';
import './AnalyticsFeatures.css';
import { Link } from 'react-router-dom';

const AnalyticsFeatures: React.FC = () => {
  return (
    <div className="analytics-features-container">
      <h1>Advanced Analytics Features</h1>
      <p>Unlock deeper insights with our premium analytics toolkit.</p>

      <div className="feature-grid">
        <div className="feature-card">
          <h2>Predictive Alerts</h2>
          <p>Anticipate tank overflows or shortages with our AI-powered predictive alerts, helping you take timely action.</p>
          <Link to="/pricing" className="learn-more-link">Learn More</Link>
        </div>

        <div className="feature-card">
          <h2>Consumption Patterns</h2>
          <p>Analyze historical water usage to understand consumption patterns and identify opportunities for conservation.</p>
          <Link to="/pricing" className="learn-more-link">Learn More</Link>
        </div>

        <div className="feature-card">
          <h2>Water Quality Trends</h2>
          <p>Track water quality metrics over time to identify trends and ensure compliance with safety standards.</p>
          <Link to="/pricing" className="learn-more-link">Learn More</Link>
        </div>

        <div className="feature-card">
          <h2>Customizable Reports</h2>
          <p>Generate detailed reports with custom date ranges and data points for in-depth analysis and stakeholder reporting.</p>
          <Link to="/pricing" className="learn-more-link">Learn More</Link>
        </div>

        <div className="feature-card">
          <h2>Data Export</h2>
          <p>Export your analytics data in various formats (CSV, PDF) for offline analysis or integration with other systems.</p>
          <Link to="/pricing" className="learn-more-link">Learn More</Link>
        </div>
        
        <div className="feature-card">
          <h2>Smart Meter Integration</h2>
          <p>Integrate with smart meters to get a holistic view of your water distribution network and improve billing accuracy.</p>
          <Link to="/pricing" className="learn-more-link">Learn More</Link>
        </div>
      </div>
      
      <div className="upgrade-section">
        <h2>Ready to upgrade?</h2>
        <p>Our premium plans offer access to all these features and more. Find the plan that's right for you.</p>
        <Link to="/pricing">
            <button className="upgrade-button">View Pricing</button>
        </Link>
      </div>

    </div>
  );
};

export default AnalyticsFeatures;
