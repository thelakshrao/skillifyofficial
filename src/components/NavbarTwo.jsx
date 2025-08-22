import React, { useEffect, useState } from "react";
import axios from "axios";
import Slogo from "../images/Slogo.png";
import defaultProfile from "../images/Char1.png"; // fallback if no profilePic

const NavbarTwo = () => {
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
    <nav className="w-full bg-[#1B1F26] px-6 py-4 flex items-center justify-between shadow-md border-b border-[#2C2F36]">
      {/* Left - Logo and Brand */}
      <div className="flex items-center space-x-3">
        <img src={Slogo} alt="Skillify Logo" className="h-10 w-10" />
        <span className="text-[#DCD0B4] text-2xl font-bold tracking-wide">
          Skillify
        </span>
      </div>

      {/* Right - Profile Picture */}
      <div className="w-10 h-10">
        <img
          src={profilePic || defaultProfile}
          alt="Profile"
          className="w-full h-full rounded-full object-cover border-2 border-[#65BDBA] shadow-md hover:scale-105 transition duration-300"
          crossOrigin="anonymous"
        />
      </div>
    </nav>
  );
};

export default NavbarTwo;
