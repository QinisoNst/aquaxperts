
import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/button";

const Profile: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          setUserData(userDocSnap.data());
        }
      }
    };

    fetchUserData();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>Username: {userData.username}</p>
      <p>Email: {userData.email}</p>
      <p>Role: {userData.role}</p>

      <div style={{ marginTop: "20px" }}>
        <h2>Location</h2>
        <p>Country: {userData.country}</p>
        <p>Province/State: {userData.province}</p>
        <p>Community: {userData.community}</p>
        <Button onClick={() => navigate("/edit-profile")} variant="primary">
          Edit
        </Button>
      </div>

      <Button onClick={handleSignOut} variant="secondary" style={{ marginTop: "20px" }}>
        Sign Out
      </Button>
    </div>
  );
};

export default Profile;
