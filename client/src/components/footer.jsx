import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-green-900 via-emerald-900 to-green-800 border-t border-green-700/50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 via-emerald-300/15 to-green-500/10"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(34,197,94,0.15),transparent)] opacity-60"></div>

      {/* Floating Orbs */}
      <div className="absolute top-2 left-10 w-16 h-16 bg-gradient-to-r from-green-400/20 to-emerald-300/15 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-2 right-12 w-12 h-12 bg-gradient-to-r from-emerald-400/15 to-green-500/20 rounded-full blur-lg animate-bounce"></div>

      <div className="relative z-10 container mx-auto px-6 py-6">
        {/* Main Content */}
        <div className="text-center space-y-4">
          {/* Brand Section */}
          <div className="space-y-1">
            <h3 className="text-lg font-bold bg-gradient-to-r from-green-300 via-emerald-200 to-green-100 bg-clip-text text-transparent">
              BusinessUpdate
            </h3>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-green-100">
            <div
              onClick={() => console.log("Navigate to about")}
              className="group relative px-3 py-1.5 rounded-lg transition-all duration-300 hover:text-white hover:bg-gradient-to-r hover:from-green-500/20 hover:to-emerald-400/15 hover:shadow-md hover:shadow-green-400/30 cursor-pointer"
            >
              <Link to="/about" className="hover">
                About
              </Link>
              {/* <span className="relative z-10 font-medium text-sm">About</span> */}
            </div>

            <div className="hidden sm:block w-px h-4 bg-gradient-to-b from-green-400/40 via-emerald-300/30 to-green-400/40"></div>

            <div
              onClick={() => console.log("Navigate to contact")}
              className="group relative px-3 py-1.5 rounded-lg transition-all duration-300 hover:text-white hover:bg-gradient-to-r hover:from-green-500/20 hover:to-emerald-400/15 hover:shadow-md hover:shadow-green-400/30 cursor-pointer"
            >
              {/* <span className="relative z-10 font-medium text-sm">Contact</span> */}
              <Link to="/contact" className="hover">
                Contact
              </Link>
            </div>

            <div className="hidden sm:block w-px h-4 bg-gradient-to-b from-green-400/40 via-emerald-300/30 to-green-400/40"></div>

            <div
              onClick={() => console.log("Navigate to privacy policy")}
              className="group relative px-3 py-1.5 rounded-lg transition-all duration-300 hover:text-white hover:bg-gradient-to-r hover:from-green-500/20 hover:to-emerald-400/15 hover:shadow-md hover:shadow-green-400/30 cursor-pointer"
            >

              <Link to="/policy" className="hover">
                Privacy Policy
              </Link>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-2 border-t border-gradient-to-r from-transparent via-green-600/40 to-transparent">
            <p className="text-green-300/80 text-xs font-light">
              &copy; {new Date().getFullYear()} BusinessUpdate. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Glow */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-400/50 via-emerald-300/40 to-transparent"></div>
    </footer>
  );
};

export default Footer;
