
require("dotenv").config();
const { incrementTriggerCounter, getTriggerCounter } = require("./utils/triggerCounter");

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const fs = require("fs");
const path = require("path");

const { authenticateToken } = require("./auth");

const app = express();
const PORT = process.env.PORT || 3000;

const DB_PATH = path.join(__dirname, "../api/data/users.json");

app.use(helmet());
app.use(express.json({ limit: "10kb" }));

// Simple JSON storage
function getUsers() {
  return JSON.parse(fs.readFileSync(DB_PATH, "utf8"));
}

function saveUsers(users) {
  fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2));
}

// Limit repeated login attempts
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
});

// Webhook action
app.post("/api/webhookAction", async (req, res) => {
  try {
    const { action, data } = req.body;
    console.log(`Received webhook action: ${action}`, data);
    res.status(200).json({ message: "Webhook action received" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Register
app.post("/api/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (
      typeof username !== "string" ||
      typeof password !== "string" ||
      username.trim().length < 3 ||
      password.length < 8 ||
      password.length > 128
    ) {
      return res.status(400).json({
        message: "Invalid username or password",
      });
    }

    const users = getUsers();
    const normalizedUsername = username.trim().toLowerCase();

    if (users.some(u => u.username === normalizedUsername)) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    users.push({
      id: require("crypto").randomUUID(),
      username: normalizedUsername,
      password: hashedPassword,
    });

    saveUsers(users);

    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Login
app.post("/api/login", loginLimiter, async (req, res) => {
  try {
    const { username, password } = req.body;

    if (
      typeof username !== "string" ||
      typeof password !== "string" ||
      username.length > 100 ||
      password.length > 128
    ) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const users = getUsers();

    const user = users.find(
      u => u.username === username.trim().toLowerCase()
    );

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }

    const token = jwt.sign(
      {
        sub: user.id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
    );

    res.json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Protected endpoint
app.get("/api/me", authenticateToken, (req, res) => {
  res.json({
    id: req.user.sub,
    username: req.user.username,
  });
});

// Trigger endpoint -> used by hook
app.post("/api/trigger", loginLimiter, async (req, res) => {
  incrementTriggerCounter();
  console.log(`Trigger incremented. Current count: ${getTriggerCounter()}`);
  res.status(200).json({ message: "Trigger incremented", count: getTriggerCounter() });
});

// Trigger endpoint -> used by FE app (tanstack)
app.get("/api/trigger", async (req, res) => {
  try {
    res.status(200)
      .json({ 
        message: "Poll trigger endpoint", 
        count: getTriggerCounter() 
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server counter error" });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Auth API running on port ${PORT}`);
});
