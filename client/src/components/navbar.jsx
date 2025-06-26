import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ isDark, toggleTheme }) => {
  return (
    <nav
      className={`w-full px-6 py-3 shadow-sm flex flex-col md:flex-row justify-between items-center ${
        isDark ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 font-bold text-xl">
        <img
          src="logo.png"
          alt="LBD"
          className="h-14 w-14 rounded-full object-cover"
        />
        <span className="hidden md:inline">LBD</span>
      </Link>

      {/* Menu Items */}
      <ul className="flex flex-col md:flex-row md:items-center gap-6 mt-4 md:mt-0">
        <li>
          <Link to="/" className="hover:underline">
            Home
          </Link>
        </li>



        <li>
          <Link to="/category" className="hover:underline">
            Category
          </Link>
        </li>

        {/* Contact */}
        <li>
          <Link to="/sourcepage" className="hover:underline">
            Location
          </Link>
        </li>

        <li>
          <Link to="/signup" className="hover:underline">
            Signup
          </Link>
        </li>

      </ul>
    </nav>
  );
};

export default Navbar;
