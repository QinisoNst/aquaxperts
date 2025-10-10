import React, { useState } from "react";
import { Droplet, Waves, GlassWater } from "lucide-react";
import Button from "../components/ui/button";
import DashboardCard from "../components/DashboardCard";
import Chatbot from "../components/Chatbot";
import waterFlow from '../components/assets/water.jpg';

import "../components/Chatbot.css";

const Home: React.FC = () => {
  const [isChatbotOpen, setChatbotOpen] = useState(false);

  return (
    <div className="font-sans text-gray-800 min-h-screen flex flex-col">

      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-64 md:h-96 lg:h-[500px]"
        style={{
          backgroundImage: `url(${waterFlow})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50 flex flex-col justify-center items-center text-white px-4 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold">
            Welcome to AquaXperts
          </h1>
          <p className="mt-3 text-sm md:text-base lg:text-lg max-w-xl">
            Save water today by a member of us to tackle water related isusse
            Click Join to be part of the
          </p>
          <Button
            variant="primary"
            className="mt-5 px-6 py-3 hover:scale-105 transition-transform"
          >
            Join
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 px-6 md:px-12 text-center max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-teal-700">
          About Us
        </h2>
        <p className="mt-3 text-gray-600 text-sm md:text-base">
          AquaXperts is a platform where we offer a wide rage of service of issues such as water level, water quality, water leaks and more...
        </p>
      </section>

      <section className="py-12 px-6 md:px-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center items-center">
        <DashboardCard
          title="Water Levels"
          value=""
          footer=""
          icon={Droplet}
          status="normal"
          link="/location/tank-analytics"
        />
        <DashboardCard
          title="Water Quality"
          value=""
          footer=""
          icon={Waves}
          status="normal"
          link="/location/water-quality"
        />
        <DashboardCard
          title="Water Leaks"
          value="2"
          footer="1 critical, 1 minor"
          icon={GlassWater}
          status="warning"
          link="/location/water-leaks"
        />
      </section>

      {/* Feeds Section */}
      <section className="py-12 px-6 md:px-12 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-teal-700 pb-2 mb-6">
            <h3 className="text-lg md:text-xl font-semibold text-teal-700">Feeds</h3>
            <p className="text-teal-700 mt-2 md:mt-0">Community Engagement</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="border rounded-md bg-white h-32 shadow-sm hover:shadow-md transition flex items-center justify-center text-gray-600 text-sm"
              >
                
              </div>
            ))}
          </div>
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
