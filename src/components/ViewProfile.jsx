import React, { useEffect, useState } from "react";
import axios from "axios";
import defaultProfile from "../images/Char1.png";
import Slogo from "../images/Slogo.png";
import Reveal from "./Reveal";

const ViewProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    website: "",
    education: "",
    about: "",
    profilePic: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8000/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setFormData(res.data);
        setPreviewImage(
          res.data.profilePic
            ? `http://localhost:8000${res.data.profilePic}`
            : null
        );
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const uploadImage = async () => {
    if (!selectedImage) return null;

    const imageData = new FormData();
    imageData.append("profilePic", selectedImage);

    const token = localStorage.getItem("token");
    const res = await axios.post(
      "http://localhost:8000/api/user/profile/upload-image",
      imageData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return res.data.profilePic;
  };

  const removeImage = async () => {
    const token = localStorage.getItem("token");
    await axios.put(
      "http://localhost:8000/api/user/profile",
      { removeProfilePic: true },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setPreviewImage(null);
    setFormData((prev) => ({ ...prev, profilePic: "" }));
  };

  const saveChanges = async () => {
    try {
      const token = localStorage.getItem("token");
      let uploadedImageURL = formData.profilePic;

      if (selectedImage) {
        uploadedImageURL = await uploadImage();
      }

      const res = await axios.put(
        "http://localhost:8000/api/user/profile",
        { ...formData, profilePic: uploadedImageURL },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFormData(res.data);
      setPreviewImage(
        res.data.profilePic
          ? `http://localhost:8000${res.data.profilePic}`
          : null
      );
      setIsEditing(false);
      alert("Profile updated!");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Update failed. Check console for error.");
    }
  };

  if (loading) {
    return (
      <div className="text-white text-center mt-10">Loading profile...</div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4 bg-gradient-to-br from-[#1D1F21] via-[#939596] to-[#A89E8F] text-white">
      <Reveal>
        <div className="max-w-6xl mx-auto bg-[#1D1F21]/80 backdrop-blur-md rounded-3xl shadow-xl p-10 border border-[#3c3c3c]">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="flex items-center gap-6 relative">
              <img
                src={previewImage || defaultProfile}
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-[#65BDBA] object-cover"
                crossOrigin="anonymous"
              />

              {isEditing && (
                <div className="flex flex-col gap-2 mt-2">
                  <label className="text-sm font-medium text-white">
                    {selectedImage ? "Change Image" : "Upload Image"}
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="text-sm text-[#e0e0e0]"
                  />
                  {previewImage && (
                    <button
                      onClick={removeImage}
                      className="text-xs text-red-400 hover:text-red-600 underline"
                    >
                      Remove Image
                    </button>
                  )}
                </div>
              )}

              <div>
                <h2 className="text-3xl font-semibold text-white">
                  {formData.name}
                </h2>
                <p className="text-[#e0e0e0] text-sm">
                  {formData.website || "user@email.com"}
                </p>
              </div>
            </div>

            <button
              onClick={() => (isEditing ? saveChanges() : setIsEditing(true))}
              className="px-6 py-2 rounded-full bg-[#A89E8F] hover:bg-[#938979] transition text-black cursor-pointer"
            >
              {isEditing ? "Save Changes" : "Edit Profile"}
            </button>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1 text-white">
                Full Name
              </label>
              <input
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                disabled={!isEditing}
                className="w-full bg-[#1D1F21] border border-[#3c3c3c] p-3 rounded-lg text-white"
                placeholder="Your Full Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-white">
                Bio
              </label>
              <input
                value={formData.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                disabled={!isEditing}
                className="w-full bg-[#1D1F21] border border-[#3c3c3c] p-3 rounded-lg text-white"
                placeholder="Short bio"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-white">
                Website
              </label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => handleInputChange("website", e.target.value)}
                disabled={!isEditing}
                className="w-full bg-[#1D1F21] border border-[#3c3c3c] p-3 rounded-lg text-white"
                placeholder="https://example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-white">
                Education
              </label>
              <input
                value={formData.education}
                onChange={(e) => handleInputChange("education", e.target.value)}
                disabled={!isEditing}
                className="w-full bg-[#1D1F21] border border-[#3c3c3c] p-3 rounded-lg text-white"
                placeholder="Your Education"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1 text-white">
                About
              </label>
              <textarea
                value={formData.about}
                onChange={(e) => handleInputChange("about", e.target.value)}
                disabled={!isEditing}
                className="w-full bg-[#1D1F21] border border-[#3c3c3c] p-3 rounded-lg text-white h-32"
                placeholder="Describe yourself"
              />
            </div>
          </div>
        </div>
      </Reveal>
      <img
        src={Slogo}
        alt="Skillify Logo"
        className="fixed top-[20%] left-[30%] opacity-20 z-0 w-[60%] max-w-[600px] pointer-events-none"
      />
    </div>
  );
};

export default ViewProfile;
