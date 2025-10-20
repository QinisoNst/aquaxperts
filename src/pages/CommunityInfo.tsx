
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import "./CommunityInfo.css";

const CommunityInfo: React.FC = () => {
  const location = useLocation();
  const [waterQualityData, setWaterQualityData] = useState<any[]>([]);
  const community = new URLSearchParams(location.search).get("community");

  useEffect(() => {
    const fetchWaterQualityData = async () => {
      if (community) {
        const waterQualityRef = collection(db, "waterQuality");
        const q = query(waterQualityRef, where("community", "==", community));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setWaterQualityData(data);
      }
    };

    fetchWaterQualityData();
  }, [community]);

  return (
    <div className="community-info-container">
      <h1>Water Quality in {community}</h1>
      {waterQualityData.length > 0 ? (
        <div className="water-quality-data">
          {waterQualityData.map((data) => (
            <div key={data.id} className="water-quality-item">
              <p>
                <strong>Date:</strong> {data.date}
              </p>
              <p>
                <strong>pH:</strong> {data.pH}
              </p>
              <p>
                <strong>Turbidity:</strong> {data.turbidity}
              </p>
              <p>
                <strong>Chlorine:</strong> {data.chlorine}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>No water quality data available for this community.</p>
      )}
    </div>
  );
};

export default CommunityInfo;
