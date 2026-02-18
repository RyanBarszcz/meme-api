# Meme Error API

A developer-friendly API that returns randomized meme-style error messages for common HTTP errors.

Because boring error messages are outdated.

---

## Live API

Base URL:

https://meme-api-steel.vercel.app

---

## Endpoint

GET /api/error?type=SERVER_ERROR

### Query Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| type      | Yes      | Error category |
| count     | No       | Number of messages to return (max 10) |

---

## Available Types

- USER_NOT_FOUND
- CONTENT_NOT_FOUND
- VALIDATION_FAILED
- UNAUTHORIZED
- RATE_LIMITED
- SERVER_ERROR
- BAD_REQUEST

Fetch dynamically:

GET /api/types

---

## Example Requests

### Single Message

GET /api/error?type=USER_NOT_FOUND

Response:

{
  "status": 404,
  "errorType": "USER_NOT_FOUND",
  "count": 1,
  "messages": [
    "We don’t know her."
  ]
}

---

### Multiple Messages

GET /api/error?type=SERVER_ERROR&count=3

Response:

{
  "status": 500,
  "errorType": "SERVER_ERROR",
  "count": 3,
  "messages": [
    "System meltdown.",
    "We broke it.",
    "Server is tired."
  ]
}

---

## Example Usage

### Frontend JavaScript

fetch("https://meme-api-steel.vercel.app/api/error?type=VALIDATION_FAILED")
  .then(res => res.json())
  .then(data => {
    console.log(data.messages[0]);
  });

---

### Node.js

const fetch = require("node-fetch");

async function getError() {
  const res = await fetch("https://meme-api-steel.vercel.app/api/error?type=SERVER_ERROR");
  const data = await res.json();
  console.log(data);
}

getError();

---

## How It Works

- Error messages are stored in a structured errors.json file.
- The API selects a random message from the requested category.
- HTTP status codes are mapped automatically.
- Optional count parameter allows multiple messages.
- Deployed using Vercel serverless functions.

---

## Project Structure

.
├── api/
│   ├── error.js
│   ├── types.js
│   └── index.js
├── errors.json
├── package.json
└── README.md

---

## Deployment (Vercel)

1. Push project to GitHub
2. Import repository into Vercel
3. Deploy
4. Share your API URL

Vercel automatically redeploys on every push.

---

## Example Use Cases

- Custom 404 pages
- Form validation responses
- Toast notifications
- Dev tools
- Internal dashboards
- Discord bots
- Slack bots
- Easter eggs
- Portfolio projects

---

Made for developers who are tired of boring error messages.
