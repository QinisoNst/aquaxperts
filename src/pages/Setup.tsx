import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import "./LocationSelection.css";

const Setup: React.FC = () => {
  const [country, setCountry] = useState("");
  const [province, setProvince] = useState("");
  const [community, setCommunity] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const handleSave = async () => {
    setSubmitted(true);
    if (country && province && community && user) {
      try {
        const userDocRef = doc(db, "users", user.uid);
        await updateDoc(userDocRef, {
          country,
          province,
          community,
        });
        navigate("/");
      } catch (error) {
        console.error("Error updating user location: ", error);
      }
    }
  };

  const countries = ["South Africa", "India"];
  const provinces: { [key: string]: string[] } = {
    "South Africa": ["Gauteng", "Western Cape", "KwaZulu-Natal"],
    India: ["Maharashtra", "Karnataka", "Tamil Nadu"],
  };
  const communities: string[] = ["Community A", "Community B", "Community C"];

  return (
    <div className="location-selection">
      <div className="location-selection-container">
        <h2>Setup Your Location</h2>
        <p>Please select your location to continue.</p>
        <div className="location-selection-dropdowns">
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className={submitted && !country ? "error" : ""}
          >
            <option value="">Select Country</option>
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            disabled={!country}
            className={submitted && !province ? "error" : ""}
          >
            <option value="">Select Province</option>
            {country &&
              provinces[country].map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
          </select>
          <select
            value={community}
            onChange={(e) => setCommunity(e.target.value)}
            disabled={!province}
            className={submitted && !community ? "error" : ""}
          >
            <option value="">Select Community</option>
            {communities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <button onClick={handleSave}>Save and Continue</button>
      </div>
    </div>
  );
};

export default Setup;
