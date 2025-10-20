import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";
import "./Login.css";

const Login: React.FC = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!usernameOrEmail || !password) {
      alert("Please enter username/email and password");
      return;
    }

    let email = usernameOrEmail;
    if (!email.includes("@")) {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("username", "==", usernameOrEmail));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        alert("User not found.");
        return;
      }
      email = querySnapshot.docs[0].data().email;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Navigate to the home page. The routing logic in App.tsx will handle redirection.
      navigate("/");
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Failed to login. Please check your credentials.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h1>Login</h1>
        <div className="input-group">
          <label htmlFor="usernameOrEmail">Username or Email</label>
          <input
            type="text"
            id="usernameOrEmail"
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      
      </form>
    </div>
  );
};

export default Login;
