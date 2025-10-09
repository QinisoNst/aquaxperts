import React from "react";
import { Droplet, Waves, GlassWater } from "lucide-react";
import DashboardCard from "../components/DashboardCard";

const DashboardSection: React.FC = () => {
  return (
    <section className="py-12 px-6 md:px-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
      <DashboardCard
        title="Water Levels"
        value="78%"
        footer="Main Reservoir: 45,000L"
        icon={Droplet}
        status="normal"
      />
      <DashboardCard
        title="Water Quality"
        value="Good"
        footer="pH: 7.2 | Turbidity: 2.1 NTU"
        icon={Waves}
        status="normal"
      />
      <DashboardCard
        title="Water Leaks"
        value={2}
        footer="1 critical, 1 minor"
        icon={GlassWater}
        status="warning"
      />
    </section>
  );
};

export default DashboardSection;
