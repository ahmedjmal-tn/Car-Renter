// src/components/Auth/LoginPage.js
import React, { useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [user, setUser] = useState({ email: "", password: "" });

  const handleSave = async (e) => {
    e.preventDefault();
    await login(user.email, user.password);
    navigate("/cars");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="image-section">
          <img src="src/img/login.png" alt="Car" className="car-image" />
        </div>
        <div className="form-section">
          <h2>Welcome Back!</h2>
          <p>Please log in to access your account and manage your bookings.</p>
          <form onSubmit={handleSave}>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                required
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                required
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
          <div className="additional-links">

          </div>
          <div className="signup-link">
            New here? <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;