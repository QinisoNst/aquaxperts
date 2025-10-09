import React from "react";
import { LucideIcon } from "lucide-react";

interface DashboardCardProps {
  title: string;
  value?: string | number;
  footer?: string;
  icon: LucideIcon;
  status?: "normal" | "warning" | "critical";
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  footer,
  icon: Icon,
  status = "normal",
}) => {
  const statusColors: Record<string, string> = {
    normal: "text-teal-600",
    warning: "text-yellow-500",
    critical: "text-red-500",
  };

  return (
    <div className="border rounded-md shadow-sm p-4 hover:shadow-md transition-transform hover:scale-105 w-40 h-40 flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">{title}</h3>
        <Icon className={`w-6 h-6 ${statusColors[status]}`} />
      </div>
      {value && <div className={`text-2xl font-bold ${statusColors[status]} mt-2`}>{value}</div>}
      {footer && <div className="text-xs text-gray-500 mt-1">{footer}</div>}
    </div>
  );
};

export default DashboardCard;
