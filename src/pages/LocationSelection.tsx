import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./LocationSelection.css";

const LocationSelection: React.FC = () => {
  const [country, setCountry] = useState("");
  const [province, setProvince] = useState("");
  const [community, setCommunity] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const { page } = useParams<{ page: string }>();

  const handleNext = () => {
    setSubmitted(true);
    if (country && province && community && page) {
      navigate(`/${page}`);
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
      <h1>Select Location</h1>
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
          disabled={!country}
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
          disabled={!province}
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

      <button
        className="next-button"
        onClick={handleNext}
        disabled={!country || !province || !community}
      >
        Next
      </button>
    </div>
  );
};

export default LocationSelection;
