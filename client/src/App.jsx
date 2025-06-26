// import { useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import "./App.css";

// import About from "./components/about";
// import CategoriesPage from "./components/category";
// import Contact from "./components/contact";
// import LandingPage from "./components/landingpage";
// // import Navbar from "./components/navbar";
// import SourcePage from "./components/sourcepage";
// import SignupForm from "./components/signup";
// import Footer from "./components/footer";

// function App() {
//   const [isDark, setIsDark] = useState(false);

//   const toggleTheme = () => setIsDark((prev) => !prev);

//   return (
//     <Router>
//       <div className={isDark ? "bg-black text-white" : "bg-white text-black"}>
//         {/* <Navbar isDark={isDark} toggleTheme={toggleTheme} /> */}
//         <Routes>
//           <Route path="/" element={<LandingPage />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/category" element={<CategoriesPage />} />
//           <Route path="/contact" element={<Contact />} />
//           {/* <Route path="/privacy-policy" element={<PrivacyPolicy />} />  */}
//           <Route path="/sourcepage" element={<SourcePage />} />
//           <Route path="/signup" element={<SignupForm />} />
//         </Routes>
//       </div>
//       <Footer />
//     </Router>
//   );
// }

// export default App;



import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import About from "./components/about";
import CategoriesPage from "./components/category";
import Contact from "./components/contact";
import LandingPage from "./components/landingpage";
import SourcePage from "./components/sourcepage";
import SignupForm from "./components/signup";
// import Login from "./components/login";
import Footer from "./components/footer";
import LoginForm from "./components/login";
// import LoginForm from "./components/login";
// import Navbar from "./components/navbar"; // Uncomment if you have it



function App() {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <Router>
      <div className={isDark ? "bg-black text-white" : "bg-white text-black"}>
        {/* <Navbar isDark={isDark} toggleTheme={toggleTheme} /> */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/category" element={<CategoriesPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/sourcepage" element={<SourcePage />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      

      <Footer />
    </Router>
  );
}

export default App;