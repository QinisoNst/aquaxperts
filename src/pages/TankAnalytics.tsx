import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './TankAnalytics.css';

interface TankData {
  id: string;
  timestamp: any;
  flowRate: number;
  waterLevel: number;
  pressure: number;
  status: string;
}

const TankAnalytics: React.FC = () => {
  const [tankData, setTankData] = useState<TankData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'tankReadings'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data: TankData[] = [];
      querySnapshot.forEach((doc) => {
        const docData = doc.data();
        data.push({
          id: doc.id,
          timestamp: docData.timestamp?.toDate(), // Convert Firestore Timestamp to Date
          flowRate: docData.flowRate,
          waterLevel: docData.waterLevel,
          pressure: docData.pressure,
          status: docData.status,
        });
      });
      setTankData(data.reverse()); // Reverse to show chronological order in chart
      setLoading(false);
    }, (error) => {
      console.error("Error fetching tank data: ", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const lastReading = tankData.length > 0 ? tankData[tankData.length - 1] : null;

  const formatTimestamp = (timestamp: any) => {
    if (!timestamp) return 'N/A';
    const date = new Date(timestamp);
    return isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleTimeString();
  };

  return (
    <div className="tank-analytics-page">
      <h1>Tank Analytics Dashboard</h1>
      <p>Real-time data from your smart water tank.</p>

      <div className="dashboard-cards">
        <div className="card">
          <div className="card-header">
            <h3>Water Level</h3>
          </div>
          <p className={`card-value ${lastReading && lastReading.waterLevel < 30 ? 'status-warning' : 'status-normal'}`}>
            {lastReading ? `${lastReading.waterLevel}%` : 'N/A'}
          </p>
          <div className="card-footer">
            {lastReading && lastReading.waterLevel < 30 ? 'Critically Low' : 'Normal'}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>Flow Rate</h3>
          </div>
          <p className="card-value">
            {lastReading ? `${lastReading.flowRate} L/min` : 'N/A'}
          </p>
          <div className="card-footer">
            Last updated: {lastReading ? formatTimestamp(lastReading.timestamp) : 'N/A'}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>Water Pressure</h3>
          </div>
          <p className={`card-value ${lastReading && (lastReading.pressure < 10 || lastReading.pressure > 50) ? 'status-warning' : 'status-normal'}`}>
            {lastReading ? `${lastReading.pressure} PSI` : 'N/A'}
          </p>
          <div className="card-footer">
            {lastReading && (lastReading.pressure < 10 || lastReading.pressure > 50) ? 'Needs Attention' : 'Stable'}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>System Status</h3>
          </div>
          <p className={`card-value ${lastReading && lastReading.status !== 'OK' ? 'status-warning' : 'status-normal'}`}>
            {lastReading ? lastReading.status : 'N/A'}
          </p>
          <div className="card-footer">
            Everything is running smoothly.
          </div>
        </div>
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={tankData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" tickFormatter={formatTimestamp} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="waterLevel" name="Water Level (%)" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="flowRate" name="Flow Rate (L/min)" stroke="#82ca9d" />
            <Line type="monotone" dataKey="pressure" name="Pressure (PSI)" stroke="#ffc658" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Water Level (%)</th>
              <th>Flow Rate (L/min)</th>
              <th>Pressure (PSI)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tankData.slice().reverse().map((reading) => (
              <tr key={reading.id}>
                <td>{formatTimestamp(reading.timestamp)}</td>
                <td>{reading.waterLevel}</td>
                <td>{reading.flowRate}</td>
                <td>{reading.pressure}</td>
                <td className={reading.status !== 'OK' ? 'status-warning' : ''}>{reading.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TankAnalytics;
