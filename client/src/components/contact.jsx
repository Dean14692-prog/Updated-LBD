import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const Contact = () => {
  return (
    <div style={{ width: "1200px" }}>
      <div>
        <div className="min-h-screen bg-gradient-to-b from-gray-700 via-gray-800 to-gray-900 text-white relative pt-20">
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

          {/* Main Content */}
          <div className="flex flex-col items-center justify-center px-4 py-10">
            <div className="bg-white text-gray-900 p-10 rounded-2xl shadow-2xl w-full max-w-md">
              <h2 className="text-4xl font-extrabold text-center text-blue-600 mb-6">
                Contact Us
              </h2>
              <p className="text-lg mb-4">
                <span className="font-semibold text-blue-600">Email:</span>{" "}
                group1@gmail.com
              </p>
              <p className="text-lg mb-4">
                <span className="font-semibold text-blue-600">Phone:</span> +254
                123456789
              </p>
              <p className="text-lg text-center text-gray-700 mt-4">
                We’d love to hear from you!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
