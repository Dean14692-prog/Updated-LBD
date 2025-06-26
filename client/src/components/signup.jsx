import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import "./signup.css";
import Navbar from "./navbar";

const SignupForm = ({ isDark }) => {
  const [isSignup, setIsSignup] = useState(true);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmpassword: "",
    role: "",
  });
  const [popupMessage, setPopupMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const showPopup = (text, type = "success") => {
    setPopupMessage({ text, type });
    setTimeout(() => setPopupMessage(null), 5000);
  };

  const validateForm = () => {
    if (isSignup) {
      if (formData.password !== formData.confirmpassword) {
        showPopup("Passwords do not match", "error");
        return false;
      }
      if (formData.password.length < 6) {
        showPopup("Password must be at least 6 characters", "error");
        return false;
      }
      if (!formData.role) {
        showPopup("Please select a role", "error");
        return false;
      }
    }
    if (!formData.email.includes("@")) {
      showPopup("Please enter a valid email", "error");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    const { fullname, email, password, role } = formData;
    const endpoint = isSignup ? "signup" : "login";

    try {
      const response = await fetch(`http://127.0.0.1:5555/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullname, email, password, role }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      showPopup(
        isSignup ? "Account created successfully!" : "Login successful!",
        "success"
      );

      if (isSignup) {
        setIsSignup(false);
      }

      setFormData({
        fullname: "",
        email: "",
        password: "",
        confirmpassword: "",
        role: "",
      });
    } catch (error) {
      console.error(`${isSignup ? "Signup" : "Login"} error:`, error);
      showPopup(
        error.message ||
          `${isSignup ? "Signup" : "Login"} failed. Please try again.`,
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className={`signup-page ${isDark ? "dark-bg" : ""}`}>
        <div className={`form-container ${isDark ? "dark" : ""}`}>
          <h2 className="form-title">
            {isSignup ? "Create Account" : "Welcome Back"}
          </h2>
          <p className="form-subtitle">
            {isSignup ? "Join us today" : "Login to your account"}
          </p>

          <div className="form-tabs">
            <button
              type="button"
              className={`form-tab ${!isSignup ? "active" : ""}`}
              onClick={() => setIsSignup(false)}
            >
              Login
            </button>
            <button
              type="button"
              className={`form-tab ${isSignup ? "active" : ""}`}
              onClick={() => setIsSignup(true)}
            >
              Sign Up
            </button>
          </div>

          <form className="form" onSubmit={handleSubmit}>
            {isSignup && (
              <>
                <TextField
                  fullWidth
                  margin="normal"
                  size="small"
                  id="fullname"
                  label="Full Name"
                  variant="outlined"
                  type="text"
                  required
                  value={formData.fullname}
                  onChange={handleChange}
                />

                <TextField
                  fullWidth
                  margin="normal"
                  size="small"
                  id="role"
                  label="Role"
                  variant="outlined"
                  select
                  value={formData.role}
                  onChange={handleChange}
                  SelectProps={{ native: true }}
                  required
                >
                  {/* <option value="">Select a role</option> */}
                  {/* 123 */}
                  <option value="consumer">Consumer</option>
                  <option value="business_owner">Business Owner</option>
                </TextField>
              </>
            )}

            <TextField
              fullWidth
              margin="normal"
              size="small"
              id="email"
              label="Email Address"
              variant="outlined"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              margin="normal"
              size="small"
              id="password"
              label="Password"
              variant="outlined"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
            />

            {isSignup && (
              <TextField
                fullWidth
                margin="normal"
                size="small"
                id="confirmpassword"
                label="Confirm Password"
                variant="outlined"
                type="password"
                required
                value={formData.confirmpassword}
                onChange={handleChange}
              />
            )}

            <button className="submit-btn" type="submit" disabled={isLoading}>
              {isLoading ? "Processing..." : isSignup ? "Sign Up" : "Login"}
            </button>
          </form>

          {popupMessage && (
            <div className={`popup-alert ${popupMessage.type}`}>
              {popupMessage.text}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
