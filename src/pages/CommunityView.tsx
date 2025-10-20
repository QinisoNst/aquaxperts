
import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import './CommunityView.css';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import CollapsibleCard from '../components/CollapsibleCard'; // Import CollapsibleCard

const CommunityView: React.FC = () => {
  const { section } = useParams<{ section: string }>();
  const location = useLocation();
  const [communityName, setCommunityName] = useState('Our Community');
  const [openCard, setOpenCard] = useState<string | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const community = searchParams.get('community');
    if (community) {
      setCommunityName(community);
    }

    const openSection = location.state?.openSection;
    if (openSection) {
      setOpenCard(openSection);
    } else if (section === 'water-level') {
      setOpenCard('tank-levels');
    } else if (section) {
      setOpenCard(section);
    }
  }, [section, location.search, location.state]);

  const handleCardToggle = (title: string) => {
    setOpenCard(openCard === title ? null : title);
  };

  // Mock data for weekly water quality
  const weeklyWaterQualityData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'pH Level',
        data: [7.2, 7.3, 7.2, 7.4, 7.3, 7.5, 7.4],
      },
      {
        label: 'Turbidity (NTU)',
        data: [1.5, 1.4, 1.6, 1.5, 1.7, 1.6, 1.5],
      },
      {
        label: 'Chlorine (mg/L)',
        data: [0.5, 0.6, 0.5, 0.7, 0.6, 0.5, 0.6],
      },
    ],
  };

  // Transform data for recharts
  const rechartsWaterQualityData = weeklyWaterQualityData.labels.map((label, index) => ({
    name: label,
    'pH Level': weeklyWaterQualityData.datasets[0].data[index],
    'Turbidity (NTU)': weeklyWaterQualityData.datasets[1].data[index],
    'Chlorine (mg/L)': weeklyWaterQualityData.datasets[2].data[index],
  }));

  // Mock data for weekly tank levels
  const weeklyTankData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Main Reservoir',
        data: [85, 84, 86, 82, 80, 83, 85],
      },
      {
        label: 'North Tank',
        data: [65, 66, 64, 67, 68, 65, 66],
      },
      {
        label: 'South Tank',
        data: [75, 76, 74, 73, 75, 77, 76],
      },
    ],
  };

  const rechartsTankData = weeklyTankData.labels.map((label, index) => ({
      name: label,
      'Main Reservoir': weeklyTankData.datasets[0].data[index],
      'North Tank': weeklyTankData.datasets[1].data[index],
      'South Tank': weeklyTankData.datasets[2].data[index],
  }));

  // Mock data for community consumption
  const communityConsumptionData = [
    { month: 'January', usage: 1200000 },
    { month: 'February', usage: 1150000 },
    { month: 'March', usage: 1300000 },
    { month: 'April', usage: 1280000 },
    { month: 'May', usage: 1350000 },
  ];

  return (
    <div className="community-view">
      <div className="community-header">
        <h1>{communityName} Water Information</h1>
        <p>Here is a simplified overview of our community's water status. This data is for informational purposes only and is not in real-time.</p>
      </div>

      <CollapsibleCard
        title="Water Quality"
        isOpen={openCard === 'water-quality'}
        onToggle={() => handleCardToggle('water-quality')}
      >
        <p>Weekly trends for key water quality indicators.</p>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={rechartsWaterQualityData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pH Level" fill="#8884d8" />
            <Bar dataKey="Turbidity (NTU)" fill="#82ca9d" />
            <Bar dataKey="Chlorine (mg/L)" fill="#ffc658" />
          </BarChart>
        </ResponsiveContainer>
        <p style={{marginTop: '20px'}}>Overall Status: <span className="status-good">Good</span></p>
      </CollapsibleCard>

      <CollapsibleCard
        title="Tank Levels"
        isOpen={openCard === 'tank-levels'}
        onToggle={() => handleCardToggle('tank-levels')}
      >
        <p>We monitor our water reservoirs to ensure a consistent supply. Here are the trends from this week:</p>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={rechartsTankData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Main Reservoir" fill="#8884d8" />
            <Bar dataKey="North Tank" fill="#82ca9d" />
            <Bar dataKey="South Tank" fill="#ffc658" />
          </BarChart>
        </ResponsiveContainer>
        <p style={{marginTop: '20px'}}>Overall Status: <span className="status-good">Stable</span></p>
      </CollapsibleCard>

      <CollapsibleCard
        title="Water Leaks"
        isOpen={openCard === 'water-leaks'}
        onToggle={() => handleCardToggle('water-leaks')}
      >
        <p>Our systems are monitored for major leaks. No widespread leaks have been detected.</p>
        <p>If you suspect a leak, please report it to the local water authority.</p>
        <p>Overall Status: <span className="status-good">No Leaks Detected</span></p>
      </CollapsibleCard>

      <CollapsibleCard
        title="Community Water Consumption"
        isOpen={openCard === 'water-consumption'}
        onToggle={() => handleCardToggle('water-consumption')}
      >
        <p>An overview of the total water consumption for the community over the past few months.</p>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={communityConsumptionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(value) => new Intl.NumberFormat('en-US', { notation: 'compact', compactDisplay: 'short' }).format(value as number)} />
            <Tooltip formatter={(value) => (value as number).toLocaleString()} />
            <Legend />
            <Line type="monotone" dataKey="usage" name="Usage (Liters)" stroke="#5A9E5A" />
          </LineChart>
        </ResponsiveContainer>
      </CollapsibleCard>
    </div>
  );
};

export default CommunityView;
