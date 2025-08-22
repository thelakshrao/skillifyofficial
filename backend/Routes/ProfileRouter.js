const router = require('express').Router();
const { getProfile, updateProfile, uploadImage } = require("../Controllers/ProfileController");
const verifyToken = require("../Middlewares/authMiddleware");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Set up multer storage (reuse one multer instance instead of re-declaring in controller)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.join(__dirname, "../uploads");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

router.get("/profile", verifyToken, getProfile);
router.put("/profile", verifyToken, upload.single("profilePic"), updateProfile);
router.post("/profile/upload-image", verifyToken, upload.single("profilePic"), uploadImage);

module.exports = router;
