import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Hireagent.png"

const Navbar = () => {
  const [userName, setUserName] = useState(null); // State to store user name
  const [userRole, setUserRole] = useState(null); // State to store user role

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("profile"));
    if (userDetails) {
      setUserName(userDetails.name);
      setUserRole(userDetails.role); // Assuming 'role' is a property in the user profile
    }
  }, []); // Added dependency array to avoid re-rendering loop

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove authToken
    localStorage.removeItem("profile");  // Remove user profile
    setUserName(null);                   // Reset userName state
    setUserRole(null);                   // Reset userRole state
    window.location.reload();            // Refresh the page to update UI
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-100 border-b border-gray-300">
      {/* Logo */}
      <Link to={"/"}>
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-blue-500 rounded-md flex items-center justify-center">
            <span className="text-white font-bold">365</span>
          </div>
          <span className="ml-2 text-xl font-bold text-gray-800">AITech</span>
        </div>
      </Link>

      {/* Navigation Links */}
      <div className="hidden text-md font-semibold md:flex space-x-6">
        <Link to={"/dashboard"} className="text-gray-700 hover:text-gray-900">
          Dashboard
        </Link>
        <Link to={"/sellers"} className="text-gray-700 hover:text-gray-900">
          AI Bots for Sellers
        </Link>
        <Link to={"/buyers"} className="text-gray-700 hover:text-gray-900">
          AI Bots for Buyers
        </Link>
        {/* Show "Leads" link only for admin */}
        {userRole === "admin" && (
          <Link to={"/lead"} className="text-gray-700 hover:text-gray-900">
            Leads
          </Link>
        )}
      </div>

      {/* Buttons */}
      <div className="flex items-center space-x-4">
        {userName ? (
          <>
            <span className="text-gray-700 font-semibold">Hi, {userName}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to={"/login"} className="text-gray-700 hover:text-gray-900">
              Login
            </Link>
            <Link to={"/signup"}>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                Try For Free
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
