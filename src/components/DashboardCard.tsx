import React from "react";
import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface DashboardCardProps {
  title: string;
  value?: string | number;
  footer?: string;
  icon: LucideIcon;
  status?: "normal" | "warning" | "critical";
  link?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  footer,
  icon: Icon,
  status = "normal",
  link,
}) => {
  const statusColors: Record<string, string> = {
    normal: "text-teal-600",
    warning: "text-yellow-500",
    critical: "text-red-500",
  };

  const cardContent = (
    <div className="border rounded-md shadow-sm p-4 hover:shadow-lg hover:scale-105 transition-transform flex flex-col justify-between items-center cursor-pointer w-full aspect-square max-w-[200px]">
      <div className="flex flex-col items-center">
        <Icon className={`w-10 h-10 ${statusColors[status]} mb-2`} />
        <h3 className="text-sm font-semibold text-center">{title}</h3>
      </div>
      {value && <div className={`text-2xl font-bold ${statusColors[status]}`}>{value}</div>}
      {footer && <div className="text-xs text-gray-500 mt-1 text-center">{footer}</div>}
    </div>
  );

  return link ? <Link to={link}>{cardContent}</Link> : cardContent;
};

export default DashboardCard;
