const Idea = require("../models/idea");
const { generateIdea } = require("../utils/openai");
const { checkRateLimit } = require("../utils/rateLimiter");
const { validationResult } = require("express-validator");

// 🔥 CREATE / GENERATE IDEA
const generateNewIdea = async (req, res) => {
  try {
    // ✅ 1. VALIDATION
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { niche, mood } = req.body;
    const userId = req.user.id;

    // ✅ 2. RATE LIMIT
    const allowed = checkRateLimit(userId);

    if (!allowed) {
      return res.status(429).json({
        success: false,
        message: "🚫 Daily limit reached (5 requests). Try tomorrow!",
      });
    }

    // ✅ 3. AI GENERATION
    const aiResponse = await generateIdea(niche, mood);

    // Normalize the AI response into schema-safe fields
    const responseText = typeof aiResponse === 'string' ? aiResponse.trim() : String(aiResponse);
    const responseLines = responseText.split('\n').map(line => line.trim()).filter(Boolean);
    const rawTitle = responseLines.length > 1 ? responseLines[0] : `Reel idea for ${niche}`;
    const title = rawTitle.substring(0, 190);
    const description = responseLines.length > 1 ? responseLines.slice(1).join(' ') : responseText;
    const safeDescription = description.substring(0, 4990);

    // ✅ 4. SAVE TO DB
    const idea = new Idea({
      user: userId,
      niche,
      tone: mood,
      title,
      description: safeDescription,
      estimatedEngagement: Math.floor(Math.random() * 31) + 70,
    });

    await idea.save();

    // ✅ 5. RESPONSE
    res.json({
      success: true,
      idea,
    });

  } catch (err) {
    console.error("Generate Idea Error:", err);
    const status = err.status === 429 ? 429 : 500;
    res.status(status).json({
      success: false,
      message: err.message || "Server error",
    });
  }
};

// 🔥 GET ALL IDEAS
const getIdeas = async (req, res) => {
  try {
    const ideas = await Idea.find({ user: req.user.id }).sort({ createdAt: -1 });

    res.json({
      success: true,
      ideas,
    });

  } catch (err) {
    console.error("Get Ideas Error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// 🔥 GET SINGLE IDEA
const getIdea = async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);

    if (!idea) {
      return res.status(404).json({
        success: false,
        message: "Idea not found",
      });
    }

    res.json({
      success: true,
      idea,
    });

  } catch (err) {
    console.error("Get Idea Error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// 🔥 DELETE IDEA
const deleteIdea = async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);

    if (!idea) {
      return res.status(404).json({
        success: false,
        message: "Idea not found",
      });
    }

    // 🔐 SECURITY: ensure user owns it
    if (idea.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }

    await idea.deleteOne();

    res.json({
      success: true,
      message: "Idea deleted successfully",
    });

  } catch (err) {
    console.error("Delete Idea Error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  generateNewIdea,
  getIdeas,
  getIdea,
  deleteIdea,
};