const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Rate limiting (100 requests per 15 minutes per IP)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 429,
    errorType: "RATE_LIMITED",
    message: "Slow down, turbo."
  }
});

app.use(limiter);

// Load error messages
const errors = JSON.parse(
    fs.readFileSync(path.join(__dirname, "errors.json"), "utf-8")
);

// Utility: Get random message
function getRandomMessage(type, count = 1) {
    const category = errors[type];
    if (!category) return null;

    const messages = [];

    for (let i = 0; i < count; i++){
        const randomIndex = Math.floor(Math.random() * category.length);
        messages.push(category[randomIndex]);
    }

    return messages;
}

// Maps error type to HTTP status codes
const statusMap = {
    USER_NOT_FOUND: 404,
    CONTENT_NOT_FOUND: 404,
    VALIDATION_FAILED: 400,
    UNAUTHORIZED: 401,
    RATE_LIMITED: 429,
    SERVER_ERROR: 500,
    BAD_REQUEST: 400
};

// Main endpoint
app.get("/api/error", (req, res) => {
  const { type, count } = req.query;

  if (!type) {
    return res.status(400).json({
      error: "Missing required query parameter: type"
    });
  }

  if (!errors[type]) {
    return res.status(400).json({
      error: "Invalid error type provided."
    });
  }

  const parsedCount = parseInt(count) || 1;

  // Safety cap so nobody requests 10,000 messages
  const safeCount = Math.min(parsedCount, 10);

  const messages = getRandomMessages(type, safeCount);
  const statusCode = statusMap[type] || 500;

  res.status(statusCode).json({
    status: statusCode,
    errorType: type,
    count: safeCount,
    messages
  });
});

// Types endpoint
app.get("/api/types", (req, res) => {
  res.json({
    availableTypes: Object.keys(errors)
  });
});

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    name: "Meme Error API",
    usage: "/api/error?type=SERVER_ERROR&count=3",
    availableTypes: Object.keys(errors)
  });
});

app.listen(PORT, () => {
  console.log(`Meme Error API running on port ${PORT}`);
});