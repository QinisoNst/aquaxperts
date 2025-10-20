
import React from "react";
import "./ReportCard.css";

export interface Report {
  id: string;
  createdAt: any;
  description: string;
  issue: string;
  location: string;
  status: string;
  userId: string;
  username: string;
}

interface ReportCardProps {
  report: Report;
}

const ReportCard: React.FC<ReportCardProps> = ({ report }) => {
  return (
    <div className="report-card">
      <h3>Issue: {report.issue}</h3>
      <p><strong>Location:</strong> {report.location}</p>
      <p><strong>Description:</strong> {report.description}</p>
      <p><strong>Status:</strong> {report.status}</p>
      <p><strong>Submitted by:</strong> {report.username}</p>
      <p><strong>Date:</strong> {new Date(report.createdAt.seconds * 1000).toLocaleString()}</p>
    </div>
  );
};

export default ReportCard;
