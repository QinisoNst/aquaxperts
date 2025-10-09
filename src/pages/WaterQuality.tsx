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
import "./WaterQuality.css";

// Register Chart.js components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const WaterQuality: React.FC = () => {
  // Example chart data
  const chartData = {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
    datasets: [
      {
        label: "pH Level",
        data: [7.2, 7.1, 6.9, 7.3, 7.0, 7.2, 7.1],
        backgroundColor: "#0288d1",
      },
      {
        label: "Turbidity (NTU)",
        data: [2.1, 3.5, 4.8, 1.8, 2.2, 3.0, 2.5],
        backgroundColor: "#66bb6a",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Water Quality Trends (Last 7 Days)",
      },
    },
  };

  return (
    <main className="water-quality-page">
      <h1>Water Quality Monitoring</h1>
      <p>Real-time monitoring of water quality parameters across the village</p>

      {/* Dashboard Cards */}
      <div className="dashboard-cards">
        <div className="card">
          <div className="card-header">
            <h3>pH Level</h3>
          </div>
          <div className="card-value">7.2</div>
          <div className="card-footer status-normal">
            Within safe range (6.5–8.5)
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>Turbidity</h3>
          </div>
          <div className="card-value">2.1 NTU</div>
          <div className="card-footer status-normal">Below 5 NTU threshold</div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>Chlorine</h3>
          </div>
          <div className="card-value">1.8 mg/L</div>
          <div className="card-footer status-normal">Optimal disinfection level</div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>Bacterial Count</h3>
          </div>
          <div className="card-value status-warning">12 CFU/mL</div>
          <div className="card-footer">Slightly elevated, monitoring</div>
        </div>
      </div>

      {/* Chart */}
      <div className="chart-container">
        <Bar data={chartData} options={chartOptions} />
      </div>

      {/* Recent Water Quality Table */}
      <div className="table-container">
        <h3>Recent Water Quality Tests</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Location</th>
              <th>pH</th>
              <th>Turbidity (NTU)</th>
              <th>Chlorine (mg/L)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2025-11-15</td>
              <td>Main Reservoir</td>
              <td>7.2</td>
              <td>2.1</td>
              <td>1.8</td>
              <td><span className="status status-normal">Good</span></td>
            </tr>
            <tr>
              <td>2025-11-14</td>
              <td>North Tank</td>
              <td>7.1</td>
              <td>3.5</td>
              <td>1.5</td>
              <td><span className="status status-normal">Good</span></td>
            </tr>
            <tr>
              <td>2025-11-13</td>
              <td>South Tank</td>
              <td>6.9</td>
              <td>4.8</td>
              <td>1.2</td>
              <td><span className="status status-warning">Monitor</span></td>
            </tr>
            <tr>
              <td>2025-11-12</td>
              <td>School Supply</td>
              <td>7.3</td>
              <td>1.8</td>
              <td>2.1</td>
              <td><span className="status status-normal">Good</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default WaterQuality;
