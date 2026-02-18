import fs from "fs";
import path from "path";

const errors = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "errors.json"), "utf-8")
);

const statusMap = {
  USER_NOT_FOUND: 404,
  CONTENT_NOT_FOUND: 404,
  VALIDATION_FAILED: 400,
  UNAUTHORIZED: 401,
  RATE_LIMITED: 429,
  SERVER_ERROR: 500,
  BAD_REQUEST: 400
};

function getRandomMessages(type, count = 1) {
  const category = errors[type];
  if (!category) return null;

  const messages = [];

  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * category.length);
    messages.push(category[randomIndex]);
  }

  return messages;
}

export default function handler(req, res) {
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
  const safeCount = Math.min(parsedCount, 10);

  const messages = getRandomMessages(type, safeCount);
  const statusCode = statusMap[type] || 500;

  res.status(statusCode).json({
    status: statusCode,
    errorType: type,
    count: safeCount,
    messages
  });
}
