import React, { useState } from "react";
import "./LoginPage.css"; // Import a CSS file for custom styles
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    firstname: "",
    lastname: "",
    telephone: "",
    email: "",
    password: "",
    password_confirmation: ""
  });

  const handleSave = async (e) => {
    e.preventDefault(); // Prevent page reload on error
    try {
      const response = await axios.post(
        "http://localhost:8000/api/users/register",
        newUser
      );
      if (response.status === 201) {
        alert("Registration successful. Please check your email to verify your account.");
        navigate("/login"); // Redirect after successful registration
      } else {
        alert("Registration failed. Please check your details.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Left Section: Image */}
        <div className="image-section">
          <img
            src="src/img/login.png"
            alt="Car"
            className="car-image"
          />
        </div>

        {/* Right Section: Form */}
        <div className="form-section">
          <h2>Create an Account</h2>
          <p>
            Since this is your first trip, you'll need to provide us with some
            information before you can check out.
          </p>
          <form onSubmit={handleSave}>
            <div className="form-group">
              <input
                type="text"
                placeholder="First Name"
                required
                value={newUser.firstname}
                onChange={(e) =>
                  setNewUser({ ...newUser, firstname: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Last Name"
                required
                value={newUser.lastname}
                onChange={(e) =>
                  setNewUser({ ...newUser, lastname: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Phone Number"
                required
                value={newUser.telephone}
                onChange={(e) =>
                  setNewUser({ ...newUser, telephone: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                required
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                required
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Confirm Password"
                required
                value={newUser.password_confirmation}
                onChange={(e) =>
                  setNewUser({ ...newUser, password_confirmation: e.target.value })
                }
              />
            </div>
            <button
              type="submit"
              className="login-button"
            >
              Sign Up
            </button>
            <div className="signup-link">
              Already have an account? <Link to="/login">Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;