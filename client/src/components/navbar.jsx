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

        {/* Hoverable Dropdown - Categories */}
        {/* <li className="relative group">
          <span className="cursor-pointer">Categories</span>
          <div className="absolute hidden group-hover:flex flex-col bg-white text-black shadow-lg rounded-md p-2 mt-2 z-10 w-40">
            <Link to="/web" className="hover:bg-gray-100 px-3 py-2 rounded">
              E-Commerce
            </Link>
            <Link to="/mobile" className="hover:bg-gray-100 px-3 py-2 rounded">
              Physical Shops
            </Link>
          </div>
        </li> */}

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

        {/* Search Field */}
        {/* <li>
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className={`px-4 py-2 rounded-full border outline-none focus:ring ${
                isDark
                  ? "bg-gray-800 text-white border-gray-700 focus:ring-gray-600"
                  : "bg-gray-100 text-black border-gray-300 focus:ring-blue-400"
              }`}
            />
            <span className="absolute right-3 top-2.5 text-gray-500">🔍</span>
          </div>
        </li> */}

        {/* Theme Toggle */}
        <li>
          <button
            onClick={toggleTheme}
            className="border rounded-full px-4 py-1 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            {isDark ? "☀️ Light" : "🌙 Dark"}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
