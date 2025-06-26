import { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmpassword: "",
    role: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const key = e.target.id || e.target.name;
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const validateForm = () => {
    const { fullname, email, password, confirmpassword, role } = formData;
    if (!fullname || !email || !password || !confirmpassword || !role) {
      setError("All fields are required.");
      return false;
    }
    if (!email.includes("@")) {
      setError("Please enter a valid email.");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return false;
    }
    if (password !== confirmpassword) {
      setError("Passwords do not match.");
      return false;
    }
    return true;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    const { fullname, email, password, role } = formData;

    try {
      await axios.post("http://localhost:5555/users", {
        fullname,
        email,
        password,
        role,
      });

      setSuccess("Account created! You can now log in.");
      setFormData({
        fullname: "",
        email: "",
        password: "",
        confirmpassword: "",
        role: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen bg-gradient-to-br from-green-100 via-green-300 to-green-500 flex items-center justify-center px-4 py-8 border shadow"
      style={{ width: "1200px" }}
    >
      {/* Top Left Home Link */}
      <div className="absolute top-4 left-4 z-50">
        <Link to="/">
          <Button
            variant="text"
            size="small"
            sx={{
              textTransform: "none",
              fontWeight: "bold",

              "&:hover": {
                color: "black",
                borderColor: "white",
              },
            }}
          >
            Home
          </Button>
        </Link>
      </div>
      <div className="w-full max-w-xl bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl px-10 py-12 space-y-6">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 tracking-tight">
          Create an Account
        </h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        {success && (
          <p className="text-green-600 text-sm text-center">{success}</p>
        )}

        <form onSubmit={handleSignup}>
          <div className="mb-2">
            <TextField
              id="fullname"
              label="Full Name"
              fullWidth
              size="small"
              // variant="outlined"
              value={formData.fullname}
              onChange={handleChange}
            />
          </div>

          <div className="mb-2">
            <TextField
              id="email"
              label="Email Address"
              fullWidth
              size="small"
              // variant="outlined"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-2">
            <TextField
              id="password"
              label="Password"
              fullWidth
              size="small"
              // variant="outlined"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="mb-2">
            <TextField
              id="confirmpassword"
              label="Confirm Password"
              fullWidth
              size="small"
              // variant="outlined"
              type="password"
              value={formData.confirmpassword}
              onChange={handleChange}
            />
          </div>

          <div className="mb-2">
            <TextField
              id="role"
              name="role"
              select
              label="Select Role"
              fullWidth
              size="small"
              // variant="outlined"
              value={formData.role}
              onChange={handleChange}
            >
              <MenuItem value="">Select a role</MenuItem>
              <MenuItem value="consumer">Consumer</MenuItem>
              <MenuItem value="business_owner">Business Owner</MenuItem>
            </TextField>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 text-white bg-green-600 rounded-xl font-semibold hover:bg-green-700 transition duration-200 shadow-md hover:shadow-lg"
          >
            {isLoading ? "Processing..." : "Sign Up"}
          </button>
        </form>

        <p className="pt-2 text-center text-sm text-gray-700">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
