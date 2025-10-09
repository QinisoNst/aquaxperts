import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./TankAnalytics.css";

// Register Chart.js components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TankAnalytics: React.FC = () => {
  // Example chart data for tank levels
  const tankLevelData = {
    labels: ["Main Reservoir", "North Tank", "South Tank", "School Supply"],
    datasets: [
      {
        label: "Water Level (%)",
        data: [78, 65, 42, 55],
        backgroundColor: "#0288d1",
      },
      {
        label: "Daily Consumption (L)",
        data: [18500, 6200, 5800, 3500],
        backgroundColor: "#66bb6a",
      },
    ],
  };

  const tankLevelOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Tank Levels & Daily Consumption" },
    },
  };

  return (
    <main className="tank-analytics-page">
      <h1>Tank Levels & Consumption Analytics</h1>
      <p>Monitor water storage and consumption patterns across the village</p>

      {/* Dashboard Cards */}
      <div className="dashboard-cards">
        <div className="card">
          <div className="card-header">
            <h3>Main Reservoir</h3>
          </div>
          <div className="card-value">78%</div>
          <div className="card-footer">45,000L / 58,000L</div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>North Tank</h3>
          </div>
          <div className="card-value">65%</div>
          <div className="card-footer">13,000L / 20,000L</div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>South Tank</h3>
          </div>
          <div className="card-value status-warning">42%</div>
          <div className="card-footer">8,400L / 20,000L</div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>Daily Consumption</h3>
          </div>
          <div className="card-value">18,500L</div>
          <div className="card-footer">+5% from last week</div>
        </div>
      </div>

      {/* Charts */}
      <div className="chart-container">
        <h3>Tank Levels Over Time</h3>
        <Bar data={tankLevelData} options={tankLevelOptions} />
      </div>

      <div className="chart-container">
        <h3>Daily Water Consumption</h3>
        <Bar data={tankLevelData} options={tankLevelOptions} />
      </div>

      {/* Consumption by Area Table */}
      <div className="table-container">
        <h3>Consumption by Area</h3>
        <table>
          <thead>
            <tr>
              <th>Area</th>
              <th>Households</th>
              <th>Avg. Daily Use</th>
              <th>Trend</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>North Village</td>
              <td>45</td>
              <td>6,200L</td>
              <td>+3%</td>
              <td><span className="status status-normal">Normal</span></td>
            </tr>
            <tr>
              <td>South Village</td>
              <td>38</td>
              <td>5,800L</td>
              <td>-2%</td>
              <td><span className="status status-normal">Normal</span></td>
            </tr>
            <tr>
              <td>School & Clinic</td>
              <td>-</td>
              <td>3,500L</td>
              <td>+8%</td>
              <td><span className="status status-warning">High</span></td>
            </tr>
            <tr>
              <td>Market Area</td>
              <td>12</td>
              <td>3,000L</td>
              <td>+5%</td>
              <td><span className="status status-normal">Normal</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default TankAnalytics;
