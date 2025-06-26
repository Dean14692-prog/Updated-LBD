import React from "react";

const About = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-700 via-gray-800 to-gray-900 p-6">
      <div className="bg-white text-gray-800 p-10 rounded-2xl shadow-2xl max-w-3xl w-full space-y-6">
        <h2 className="text-4xl font-extrabold text-center text-green-700">
          About Local Business Directory
        </h2>
        <p className="text-lg leading-relaxed">
          <span className="font-semibold text-green-600">
            Local Business Directory
          </span>{" "}
          is a community-driven platform designed to showcase businesses from
          various counties and locations across Kenya.
        </p>
        <p className="text-lg leading-relaxed">
          Our goal is to provide an easy-to-use and visually clear directory
          where users can browse businesses, filter by county and location, and
          learn more about services offered near them.
        </p>
        <p className="text-lg leading-relaxed">
          Whether you're looking to promote a business, explore new ones, or
          support your local economy, this platform helps make connections
          simple and accessible.
        </p>
        <p className="text-center font-bold text-2xl text-green-700 mt-8">
          SUPPORT LOCAL. DISCOVER MORE.
        </p>
      </div>
    </div>
  );
};

export default About;
