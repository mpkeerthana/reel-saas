const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

// 🔐 Auth middleware
const auth = require("../middleware/authmiddleware");

// 🎯 Controllers
const {
  generateNewIdea,
  getIdeas,
  getIdea,
  deleteIdea,
} = require("../controllers/ideacontroller");

// ============================================
// 🚀 GENERATE NEW IDEA
// POST /api/ideas/generate
// ============================================
router.post(
  "/generate",
  [
    auth,
    body("niche", "Niche is required").not().isEmpty(),
    body("mood", "Mood is required").not().isEmpty(),
  ],
  generateNewIdea
);

// ============================================
// 📥 GET ALL IDEAS
// GET /api/ideas
// ============================================
router.get("/", auth, getIdeas);

// ============================================
// 📄 GET SINGLE IDEA
// GET /api/ideas/:id
// ============================================
router.get("/:id", auth, getIdea);

// ============================================
// ❌ DELETE IDEA
// DELETE /api/ideas/:id
// ============================================
router.delete("/:id", auth, deleteIdea);

module.exports = router;