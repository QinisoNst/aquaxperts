import React, { useState } from "react";
import { useNavigate, useParams, useLocation, Link } from "react-router-dom";
import "./LocationSelection.css";

const LocationSelection: React.FC = () => {
  const [country, setCountry] = useState("");
  const [province, setProvince] = useState("");
  const [community, setCommunity] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { page, section } = useParams<{ page: string, section?: string }>();

  const from = location.state?.from;
  const openSection = location.state?.openSection;

  const handleNext = () => {
    setSubmitted(true);
    if (country && province && community) {
      if (from === "/") {
        navigate(`/water-info?community=${community}`, { state: { openSection } });
      } else if (page && section) {
        navigate(`/${page}/${section}?community=${community}`, {
          state: { openSection },
        });
      } else if (page) {
        navigate(`/${page}?community=${community}`, { state: { openSection } });
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

      <button
        className="next-button"
        onClick={handleNext}
      >
          Next
      </button>
    </div>
  );
};

export default LocationSelection;
