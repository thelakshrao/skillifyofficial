import React, { useEffect, useState } from "react";
import axios from "axios";
import Slogo from "../images/Slogo.png";
import defaultProfile from "../images/Char1.png"; // fallback if no profilePic

const Navbar = () => {
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    const fetchProfilePic = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8000/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.profilePic) {
          setProfilePic(`http://localhost:8000${res.data.profilePic}`);
        }
      } catch (err) {
        console.error("Failed to load profile pic:", err);
      }
    };

    fetchProfilePic();
  }, []);

  return (
    <nav className="w-full bg-[#0f0f1b] px-6 py-4 flex items-center justify-between shadow-lg">
      {/* Left - Logo */}
      <div className="flex items-center space-x-3">
        <img src={Slogo} alt="Skillify Logo" className="h-10 w-10" />
        <span className="text-white text-2xl font-bold tracking-wide">
          Skillify
        </span>
      </div>

      {/* Center - Search Bar */}
      <div className="flex-1 mx-6 max-w-xl hidden md:block">
        <input
          type="text"
          placeholder="Search courses, topics..."
          className="w-full px-5 py-2 bg-[#1a1a2e] border border-gray-600 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
      </div>

      {/* Right - Profile Picture */}
      <div className="w-10 h-10">
        <img
          src={profilePic || defaultProfile}
          alt="Profile"
          className="w-full h-full rounded-full object-cover border-2 border-cyan-400 shadow-md"
          crossOrigin="anonymous"
        />
      </div>
    </nav>
  );
};

export default Navbar;
