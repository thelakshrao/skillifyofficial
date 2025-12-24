const mongoose = require("mongoose");

const courseProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  courseSlug: { type: String, required: true }, // Same slug you use in URL
  completedPages: { type: [Number], default: [] }, // Page indices like 0, 1, 2
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("CourseProgress", courseProgressSchema);
