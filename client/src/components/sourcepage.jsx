import React from "react";
import SourceFilter from "./sourcefilter";
import Navbar from "./navbar";

const SourcePage = () => {
  return (
    <div>
      <Navbar />
      <div className="p-6 bg-slate-100 min-h-screen">
        <h2 className="text-2xl font-bold text-center mb-4">
          Browse Local Businesses
        </h2>
        <SourceFilter />
      </div>
    </div>
  );
};

export default SourcePage;
