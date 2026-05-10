import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-500 to-blue-700 shadow-md text-white">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold hover:text-gray-200">
          Expense Tracker
        </Link>

        {/* Mobile button */}
        <button
          className="text-3xl md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>

        {/* Links */}
        <div
          className={`absolute md:static top-16 right-4 md:flex flex-col md:flex-row gap-4 md:gap-8 bg-black md:bg-transparent p-4 md:p-0 rounded-md md:rounded-none shadow-lg md:shadow-none transition-all duration-300 ${
            isMenuOpen ? "flex" : "hidden md:flex"
          }`}
        >
          <Link
            to="/login"
            onClick={() => setIsMenuOpen(false)}
            className="text-lg font-medium hover:text-yellow-300 transition"
          >
            Login
          </Link>

          <Link
            to="/signup"
            onClick={() => setIsMenuOpen(false)}
            className="text-lg font-medium hover:text-yellow-300 transition"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
