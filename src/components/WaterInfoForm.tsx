
import React, { useState } from 'react';
import { createWaterInfo } from '../services/waterInfoService';

const WaterInfoForm: React.FC = () => {
  const [location, setLocation] = useState('');
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const waterInfoData = {
      location,
      latitude,
      longitude,
      water_quality: {
        pH_level: 7.2,
        turbidity: 1.5,
        chlorine: 0.5,
      },
      tank_level: {
        main_reservoir: 80,
        north_tank: 60,
        south_tank: 70,
        daily_consumption: 1200,
      },
      water_leak: {
        current_flow_rate: 50,
        average_flow_rate: 48,
        leak_status: 'No Leak' as 'No Leak' | 'Leak Detected',
        leak_detected: false,
        weekly_water_usage: {
          current_week: { Mon: 100, Tue: 110, Wed: 105, Thu: 115, Fri: 120, Sat: 125, Sun: 130 },
          last_week: { Mon: 95, Tue: 105, Wed: 100, Thu: 110, Fri: 115, Sat: 120, Sun: 125 },
        },
      },
    };

    try {
      await createWaterInfo(waterInfoData);
      alert('Water info added successfully!');
      // Clear form if needed
      setLocation('');
      setLatitude(0);
      setLongitude(0);
    } catch (error) {
      alert('Error adding water info.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Water Information</h2>
      <div>
        <label>Location:</label>
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
      </div>
      <div>
        <label>Latitude:</label>
        <input type="number" value={latitude} onChange={(e) => setLatitude(parseFloat(e.target.value))} required />
      </div>
      <div>
        <label>Longitude:</label>
        <input type="number" value={longitude} onChange={(e) => setLongitude(parseFloat(e.target.value))} required />
      </div>
      <button type="submit">Add Water Info</button>
    </form>
  );
};

export default WaterInfoForm;
