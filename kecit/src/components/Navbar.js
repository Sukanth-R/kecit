import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 p-3 flex justify-center space-x-4">
      <Link to="/" className="text-white hover:bg-blue-500 px-4 py-2 rounded transition duration-300">
        HOD Details
      </Link>
      <Link to="/components/Highlights" className="text-white hover:bg-blue-500 px-4 py-2 rounded transition duration-300">
        Highlights
      </Link>
    </nav>
  );
};

export default Navbar;