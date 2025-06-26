// import React, { useState, useEffect } from "react";
// import Navbar from "./navbar";

// const CategoriesPage = () => {
//   const [categories, setCategories] = useState([]);
//   const [businesses, setBusinesses] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("");

//   // Fetch categories from backend
//   useEffect(() => {
//     fetch("/api/categories")
//       .then((res) => res.json())
//       .then((data) => setCategories(data))
//       .catch((err) => console.error("Error fetching categories:", err));
//   }, []);

//   // Fetch businesses based on selectedCategory
//   useEffect(() => {
//     let url = "/api/businesses";
//     if (selectedCategory) {
//       url += `?category=${encodeURIComponent(selectedCategory)}`;
//     }

//     fetch(url)
//       .then((res) => res.json())
//       .then((data) => setBusinesses(data))
//       .catch((err) => console.error("Error fetching businesses:", err));
//   }, [selectedCategory]);

//     return (
//         <div>
//             <Navbar />
//         <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-xl mt-10">
//           <h2 className="text-2xl font-bold mb-4 text-gray-800">
//             Filter by Category
//           </h2>

//           <select
//             value={selectedCategory}
//             onChange={(e) => setSelectedCategory(e.target.value)}
//             className="w-full p-2 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//           >
//             <option value="">All</option>
//             {categories.map((cat, i) => (
//               <option key={i} value={cat}>
//                 {cat}
//               </option>
//             ))}
//           </select>

//           <h3 className="text-xl font-semibold mb-3 text-gray-700">
//             Businesses:
//           </h3>

//           {businesses.length > 0 ? (
//             <ul className="space-y-2">
//               {businesses.map((biz, i) => (
//                 <li
//                   key={i}
//                   className="p-3 border border-gray-200 rounded-md bg-gray-50 hover:bg-gray-100"
//                 >
//                   <span className="font-medium">{biz.name}</span>{" "}
//                   <span className="text-sm text-gray-500">
//                     ({biz.category})
//                   </span>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p className="text-gray-500 italic">
//               No businesses found in this category.
//             </p>
//           )}
//         </div>
//        </div>
//     );
// };

// export default CategoriesPage;


import React, { useState, useEffect } from "react";
import Navbar from "./navbar";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  // Fetch categories
  useEffect(() => {
    fetch("http://127.0.0.1:5555/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  // Fetch businesses
  useEffect(() => {
    let url = "http://127.0.0.1:5555/categories";
    if (selectedCategoryId) {
      url += `?category_id=${selectedCategoryId}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => setBusinesses(data))
      .catch((err) => console.error("Error fetching businesses:", err));
  }, [selectedCategoryId]);

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-xl mt-10">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Filter by Category
        </h2>

        <select
          value={selectedCategoryId}
          onChange={(e) => setSelectedCategoryId(e.target.value)}
          className="w-full p-2 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">All</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <h3 className="text-xl font-semibold mb-3 text-gray-700">
          Businesses:
        </h3>

        {businesses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {businesses.map((biz) => (
              <div
                key={biz.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <img
                  src={biz.image_url || "https://via.placeholder.com/400x200"}
                  alt={biz.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h4 className="text-lg font-bold text-gray-800">
                    {biz.name}
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">
                    {biz.category?.name || "Uncategorized"}
                  </p>
                  <p className="text-gray-700 text-sm mb-3">
                    {biz.description || "No description available."}
                  </p>
                  {biz.website && (
                    <a
                      href={biz.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-green-600 hover:underline text-sm font-medium"
                    >
                      Visit Website →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">
            No businesses found in this category.
          </p>
        )}
      </div>
    </div>
  );
};

export default CategoriesPage;
