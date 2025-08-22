import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import profileImg from "../images/Char1.png";
import axios from "axios";
import { FaGraduationCap, FaGlobe, FaInfoCircle } from "react-icons/fa";

const ProfileBox = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: "",
    bio: "",
    profilePic: "",
    website: "",
    education: "",
    about: "",
  });

  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8000/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
      } catch (err) {
        console.error("Failed to load profile in ProfileBox:", err);
      }
    };

    fetchProfile();
  }, []);

  const imageURL = profile.profilePic
    ? `http://localhost:8000${profile.profilePic}`
    : profileImg;

  const renderField = (label, value, Icon) => (
    <div className="flex items-start space-x-3 mb-4">
      <Icon className="text-[#65BDBA] mt-1" />
      <div>
        <p className="text-sm font-semibold text-[#DCD0B4]">{label}</p>
        {value ? (
          <p
            className={`text-sm text-[#CFC5AD] break-words max-w-md ${
              label === "About" ? "text-justify" : ""
            }`}
          >
            {label === "Website" ? (
              <a
                href={value}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-[#86d2d0] transition"
              >
                {value}
              </a>
            ) : (
              value
            )}
          </p>
        ) : (
          <p className="text-sm italic text-red-400">
            Please update your {label.toLowerCase()}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-[#2C2F36] text-[#DCD0B4] rounded-2xl shadow-md p-6 mb-8 transition-all duration-300 ease-in-out">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center justify-between">
        {/* Left: Profile Picture + Basic Info */}
        <div className="flex items-center space-x-4">
          <img
            src={imageURL}
            alt="User"
            className="w-24 h-24 rounded-full border-4 border-[#65BDBA] object-cover"
            crossOrigin="anonymous"
          />
          <div>
            <h2 className="text-2xl font-extrabold tracking-wide">
              {profile.name || "Welcome User"}
            </h2>
            <p className="text-sm italic text-[#8C8274]">
              {profile.bio || "Write your bio here"}
            </p>
            <button
              onClick={() => setShowMore(!showMore)}
              className="text-[#65BDBA] hover:underline text-sm mt-2"
            >
              {showMore ? "less..." : "more..."}
            </button>
          </div>
        </div>

        {/* Right: Edit Button */}
        <div className="mt-4 md:mt-0">
          <button
            onClick={() => navigate("/view-profile")}
            className="bg-[#65BDBA] hover:bg-[#86d2d0] text-[#1B1F26] px-4 py-2 rounded-xl transition font-medium"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* More Details Section */}
      {showMore && (
        <div className="mt-6 border-t border-[#8C8274]/40 pt-4">
          <h3 className="text-lg font-semibold mb-4 text-[#DCD0B4] tracking-wide">
            <span className="border-b-2 border-[#65BDBA] pb-1">More Details</span>
          </h3>
          {renderField("Website", profile.website, FaGlobe)}
          {renderField("Education", profile.education, FaGraduationCap)}
          {renderField("About", profile.about, FaInfoCircle)}
        </div>
      )}
    </div>
  );
};

export default ProfileBox;
