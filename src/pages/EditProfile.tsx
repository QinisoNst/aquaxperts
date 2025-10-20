
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import "./LocationSelection.css";

const EditProfile: React.FC = () => {
  const [username, setUsername] = useState("");
  const [country, setCountry] = useState("");
  const [province, setProvince] = useState("");
  const [community, setCommunity] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const data = userDocSnap.data();
          setUsername(data.username || "");
          setCountry(data.country || "");
          setProvince(data.province || "");
          setCommunity(data.community || "");
        }
      }
    };

    fetchUserData();
  }, []);

  const handleSave = async () => {
    setSubmitted(true);
    if (username && country && province && community) {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        await setDoc(
          userDocRef,
          {
            username,
            country,
            province,
            community,
          },
          { merge: true }
        );
        navigate("/profile");
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
    <div className="location-selection-container">
      <h1>Edit Profile</h1>
      <div className="selection-box">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username}
          className={submitted && !username ? "invalid" : ""}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="selection-box">
        <label htmlFor="country">Country</label>
        <select
          id="country"
          value={country}
          className={submitted && !country ? "invalid" : ""}
          onChange={(e) => {
            setCountry(e.target.value);
            setProvince("");
            setCommunity("");
          }}
        >
          <option value="">Select a country</option>
          {countries.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="selection-box">
        <label htmlFor="province">Province/State</label>
        <select
          id="province"
          value={province}
          className={submitted && !province ? "invalid" : ""}
          onChange={(e) => {
            setProvince(e.target.value);
            setCommunity("");
          }}
        >
          <option value="">Select a province/state</option>
          {country &&
            provinces[country] &&
            provinces[country].map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
        </select>
      </div>

      <div className="selection-box">
        <label htmlFor="community">Community</label>
        <select
          id="community"
          value={community}
          className={submitted && !community ? "invalid" : ""}
          onChange={(e) => setCommunity(e.target.value)}
        >
          <option value="">Select a community</option>
          {province &&
            communities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
        </select>
      </div>

      <button className="next-button" onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default EditProfile;
