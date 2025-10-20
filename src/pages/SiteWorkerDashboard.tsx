
import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import ReportCard, { Report } from "../components/ReportCard";

const SiteWorkerDashboard: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    const fetchReports = async () => {
      const reportsCollection = collection(db, "reports");
      const reportsSnapshot = await getDocs(reportsCollection);
      const reportsData = reportsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Report[];
      setReports(reportsData);
    };

    fetchReports();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Site Worker Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((report) => (
          <ReportCard key={report.id} report={report} />
        ))}
      </div>
    </div>
  );
};

export default SiteWorkerDashboard;
