const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();

// CORS configuration to allow requests from your frontend
const corsOptions = {
  origin: "http://localhost:5173", // Adjust this to your frontend URL if different
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());

// Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "alert360",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    process.exit(1);
  }
  console.log("✅ MySQL Connected");
});

// Signup route
app.post("/signup", async (req, res) => {
  try {
    const { name, email, phone, address, userType, experienceLevel, skills, emergencyContact, bloodGroup, specialNeeds, password } = req.body;

    // Simple validation: Check if all required fields are provided
    if (!name || !email || !phone || !address || !userType || !experienceLevel || !skills || !emergencyContact || !bloodGroup || !password) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = "INSERT INTO users (name, email, phone, address, userType, experienceLevel, skills, emergencyContact, bloodGroup, specialNeeds, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    db.query(sql, [name, email, phone, address, userType, experienceLevel, skills, emergencyContact, bloodGroup, specialNeeds, hashedPassword], (err, result) => {
      if (err) {
        console.error("Error during signup:", err);
        return res.status(500).json({ success: false, message: "Signup failed", error: err.sqlMessage });
      }
      res.json({ success: true, message: "Signup successful", userId: result.insertId });
    });
  } catch (error) {
    console.error("Error in signup route:", error);
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
});

// Login route
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], async (err, results) => {
    if (err) {
      console.error("Database error during login:", err);
      return res.status(500).json({ success: false, message: "Database error", error: err.sqlMessage });
    }
    if (results.length === 0) return res.status(401).json({ success: false, message: "Invalid email or password" });

    const user = results[0];
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(401).json({ success: false, message: "Invalid email or password" });

    const token = jwt.sign({ id: user.id, userType: user.userType }, process.env.JWT_SECRET || "secretkey", { expiresIn: "1h" });

    res.json({ success: true, message: "Login successful", token, userType: user.userType });
  });
});

// Middleware for protected routes
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ success: false, message: "Access denied" });

  jwt.verify(token.split(" ")[1], process.env.JWT_SECRET || "secretkey", (err, user) => {
    if (err) return res.status(403).json({ success: false, message: "Invalid token" });
    req.user = user;
    next();
  });
};

// Protected route (User Dashboard)
app.get("/dashboard", authenticateToken, (req, res) => {
  res.json({ success: true, message: "Welcome to the user dashboard!", userType: req.user.userType });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
