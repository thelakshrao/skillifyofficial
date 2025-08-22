const express = require("express");
const router = express.Router();
const verifyToken = require("../Middlewares/verifyToken");
const CourseProgress = require("../Models/courseProgress.model");

// ✅ GET progress for a specific course
router.get("/:slug", verifyToken, async (req, res) => {
  try {
    const progress = await CourseProgress.findOne({
      userId: req.user._id,
      courseSlug: req.params.slug,
    });

    res.json(progress || { completedPages: [] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch progress" });
  }
});

router.post("/:slug", verifyToken, async (req, res) => {
  let { pageIndex, isCompleted } = req.body;
  pageIndex = Number(pageIndex);

  console.log("Slug:", req.params.slug); // ✅ Step 1
  console.log("User ID:", req.user._id); // ✅ Step 2
  console.log("PageIndex:", pageIndex, "Completed?", isCompleted);

  try {
    let progress = await CourseProgress.findOne({
      userId: req.user._id,
      courseSlug: req.params.slug,
    });

    console.log("Found Progress:", progress); // ✅ Step 3

    if (!progress) {
      progress = new CourseProgress({
        userId: req.user._id,
        courseSlug: req.params.slug,
        completedPages: isCompleted ? [pageIndex] : [],
      });
    } else {
      const pageSet = new Set(progress.completedPages.map(Number));
      isCompleted ? pageSet.add(pageIndex) : pageSet.delete(pageIndex);
      progress.completedPages = [...pageSet];
      progress.updatedAt = Date.now();
    }

    await progress.save();
    console.log("Saved Progress:", progress); // ✅ Step 4

    res.json({
      message: "Progress updated",
      completedPages: progress.completedPages,
    });
  } catch (err) {
    console.error("Error while saving progress:", err);
    res.status(500).json({ error: "Failed to update progress" });
  }
});

// ✅ GET dashboard data (last 3 started courses)
router.get("/", verifyToken, async (req, res) => {
  try {
    const progressList = await CourseProgress.find({ userId: req.user._id })
      .sort({ updatedAt: -1 })
      .limit(3);

    res.json(progressList); // frontend fetch course details by slug
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch dashboard progress" });
  }
});

// ✅ GET all courses user started
router.get("/all", verifyToken, async (req, res) => {
  try {
    const all = await CourseProgress.find({ userId: req.user._id }).sort({
      updatedAt: -1,
    });
    res.json(all);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch all progress" });
  }
});

module.exports = router;
