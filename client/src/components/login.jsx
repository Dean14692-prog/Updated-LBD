import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";


const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const { email, password } = formData;

    if (!email || !password) {
      setError("Both fields are required.");
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.post("http://localhost:5555/login", {
        email,
        password,
      });

      // Optional: store user
      localStorage.setItem("user", JSON.stringify(res.data));

      // ✅ Navigate to home page
      navigate("/category");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Check credentials."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-green-100 via-green-300 to-green-500 flex items-center justify-center px-4 py-8 border shadow"
      style={{ width: "1200px" }}
    >
      {/* Top Left Home Link */}
      <div className="absolute top-10 left-15 z-70">
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
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Login
        </h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="mb-2">
            <TextField
              type="email"
              id="email"
              label="Email"
              size="small"
              fullWidth
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-2">
            <TextField
              type="password"
              id="password"
              label="Password"
              size="small"
              fullWidth
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          Don’t have an account?{" "}
          <a href="/signup" className="text-green-600 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
