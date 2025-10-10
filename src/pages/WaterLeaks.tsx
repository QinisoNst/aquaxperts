import React from 'react';
import './WaterLeaks.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const WaterLeaks: React.FC = () => {
  const flowRateData = {
    currentRate: 15, // L/min
    averageRate: 12, // L/min
    leakStatus: 'Leak Detected',
  };

  const weeklyData = [
    { name: 'Mon', lastWeek: 4000, currentWeek: 4200 },
    { name: 'Tue', lastWeek: 3000, currentWeek: 3200 },
    { name: 'Wed', lastWeek: 2000, currentWeek: 2100 },
    { name: 'Thu', lastWeek: 2780, currentWeek: 2900 },
    { name: 'Fri', lastWeek: 1890, currentWeek: 4800 },
    { name: 'Sat', lastWeek: 2390, currentWeek: 2500 },
    { name: 'Sun', lastWeek: 3490, currentWeek: 3600 },
  ];

  return (
    <div className="water-leaks-container">
      <header className="water-leaks-header">
        <h1>Water Leak Detection</h1>
        <p>Real-time monitoring of water flow to detect leaks.</p>
      </header>

      <section className="water-leaks-data">
        <div className="data-card">
          <h2>Current Flow Rate</h2>
          <p className="data-value">{flowRateData.currentRate} L/min</p>
        </div>
        <div className="data-card">
          <h2>Average Flow Rate</h2>
          <p className="data-value">{flowRateData.averageRate} L/min</p>
        </div>
        <div className={`data-card ${flowRateData.leakStatus === 'Leak Detected' ? 'leak-detected' : ''}`}>
          <h2>Leak Status</h2>
          <p className="data-value">{flowRateData.leakStatus}</p>
        </div>
      </section>

      <section className="water-leaks-chart">
        <h2>Weekly Water Usage Trends</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={weeklyData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="lastWeek" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="currentWeek" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </section>

      <section className="water-leaks-recommendations">
        <h2>Recommendations</h2>
        {flowRateData.leakStatus === 'Leak Detected' ? (
          <ul>
            <li>A potential leak has been detected based on the current flow rate.</li>
            <li>Check for visible signs of leaks in your plumbing.</li>
            <li>Consider shutting off the main water valve to prevent further water loss.</li>
            <li>Contact a professional plumber for assistance.</li>
          </ul>
        ) : (
          <p>No leaks detected at the moment. Continue to monitor for any unusual changes in flow rate.</p>
        )}
      </section>
    </div>
  );
};

export default WaterLeaks;
