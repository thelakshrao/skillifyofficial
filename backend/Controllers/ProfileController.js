const UserModel = require("../Models/User");
const bcrypt = require("bcrypt");

// Upload Image Handler
const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Save filename (or full path if you want)
    const imagePath = `/uploads/${req.file.filename}`;

    const updatedUser = await UserModel.findByIdAndUpdate(
      req.user._id,
      { profilePic: imagePath },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Image update failed:", error);
    res.status(500).json({ message: "Image update failed" });
  }
};

// Get Profile Handler
const getProfile = async (req, res) => {
  try {
    console.log("req.user inside getProfile:", req.user); // ✅ ADD THIS

    if (!req.user || !req.user._id) {
      return res.status(400).json({ message: "Invalid token payload" });
    }

    const user = await UserModel.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("Get profile error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// Update Profile Handler
const updateProfile = async (req, res) => {
  try {
    const updates = { ...req.body };

    // Hash password if provided
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    // If file uploaded, update profilePic path
    if (req.file) {
      updates.profilePic = `/uploads/${req.file.filename}`;
    }

    // Remove profile picture if requested
    if (req.body.removeProfilePic === "true") {
      updates.profilePic = "";
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      req.user._id,
      updates,
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getProfile, updateProfile, uploadImage };
