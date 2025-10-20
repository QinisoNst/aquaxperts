import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import './SmartMeterPage.css';

const SmartMeterPage: React.FC = () => {
  const [meterReadings, setMeterReadings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  // Fetch readings from Firestore
  const fetchMeterReadings = async () => {
    setLoading(true);
    try {
      const readingsCollection = await getDocs(collection(db, 'meterReadings'));
      const formatted = readingsCollection.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          month: data.month,
          usage: Number(data.usage), // ensure number
          cost: Number(data.cost),   // ensure number
        };
      });
      setMeterReadings(formatted);
    } catch (error) {
      console.error("Error fetching meter readings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeterReadings();
  }, []);

  // Call API to generate mock data
  const generateMockData = async () => {
    setGenerating(true);
    try {
      const response = await fetch('http://localhost:5000/api/generate-data');
      if (response.ok) {
        console.log('Mock data generated successfully');
        // Refresh readings after generation
        await fetchMeterReadings();
      } else {
        console.error('Failed to generate mock data');
      }
    } catch (error) {
      console.error('Error generating mock data:', error);
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return <div>Loading meter readings...</div>;
  }

  return (
    <div className="smart-meter-container">
      <h1>Smart Meter Readings</h1>

      <button onClick={generateMockData} disabled={generating}>
        {generating ? 'Generating...' : 'Generate Mock Data'}
      </button>

      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Usage (Liters)</th>
            <th>Estimated Cost ($)</th>
          </tr>
        </thead>
        <tbody>
          {meterReadings.map(reading => (
            <tr key={reading.id}>
              <td>{reading.month}</td>
              <td>{reading.usage}</td>
              <td>{Number(reading.cost || 0).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SmartMeterPage;
