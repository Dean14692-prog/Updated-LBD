import React, { useState, useEffect } from "react";

const API_URL = "http://localhost:5555/business_profiles";

const SourceFilter = () => {
  const [businessProfiles, setBusinessProfiles] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched business profiles:", data);
        setBusinessProfiles(data);
      })
      .catch((err) => console.error("Error fetching businesses:", err))
      .finally(() => setLoading(false));
  }, []);

  const locations = [...new Set(businessProfiles.map((b) => b.location))];

  const filtered = businessProfiles.filter(
    (b) => !selectedLocation || b.location === selectedLocation
  );

  return (
    <div className="p-6 bg-slate-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-6">
        Browse by Location
      </h2>

      <div className="flex flex-wrap justify-center gap-2 mb-6">
        <button
          onClick={() => setSelectedLocation("")}
          className={`px-4 py-2 rounded-full ${
            !selectedLocation
              ? "bg-blue-600 text-white"
              : "bg-blue-100 text-blue-700"
          } hover:bg-blue-200`}
        >
          All Locations
        </button>
        {locations.map((loc, i) => (
          <button
            key={i}
            onClick={() => setSelectedLocation(loc)}
            className={`px-4 py-2 rounded-full ${
              selectedLocation === loc
                ? "bg-blue-600 text-white"
                : "bg-blue-100 text-blue-700"
            } hover:bg-blue-200`}
          >
            {loc}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p className="text-center text-gray-500">Loading businesses…</p>
        ) : filtered.length ? (
          filtered.map((biz) => (
            <div
              key={biz.id}
              className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={
                  biz.image_url ||
                  "https://via.placeholder.com/400x200?text=Business"
                }
                alt={biz.name}
                className="w-full h-48 object-cover"
              />

              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">{biz.name}</h3>
                <p className="text-sm text-gray-500 mb-1">{biz.location}</p>
                {biz.category?.name && (
                  <p className="text-sm text-gray-600 mb-1">
                    Category: {biz.category.name}
                  </p>
                )}
                <p className="text-gray-700 text-sm line-clamp-3 mb-1">
                  {biz.description}
                </p>
                {biz.owner?.fullname && (
                  <p className="text-sm text-gray-600">
                    Owner: {biz.owner.fullname}
                  </p>
                )}
                {biz.reviews?.length > 0 && (
                  <p className="text-sm text-green-600 mt-2">
                    ⭐ {biz.reviews.length} review
                    {biz.reviews.length > 1 ? "s" : ""}
                  </p>
                )}
                {biz.url && (
                  <a
                    href={biz.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 font-semibold hover:underline mt-3 inline-block"
                  >
                    Visit Business
                  </a>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No businesses found.</p>
        )}
      </div>
    </div>
  );
};

export default SourceFilter;

