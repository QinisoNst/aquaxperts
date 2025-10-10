import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/button';
import './Signup.css';

const Signup: React.FC = () => {
  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2 className="signup-header">Sign Up</h2>
        <form>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
          </div>
          <Button variant="primary" type="submit">Sign Up</Button>
        </form>
        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;