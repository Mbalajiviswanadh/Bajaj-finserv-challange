// index.js

const express = require("express");
const cors = require("cors"); // Import CORS
const app = express();
const port = 5000; // Change port to 5000

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

// User details (replace with actual data)
const fullName = "john_doe"; // Full name in lowercase
const dob = "17091999"; // Date of birth in ddmmyyyy format

// POST /bfhl endpoint
app.post("/bfhl", (req, res) => {
  try {
    const data = req.body.data;

    // Validate data
    if (!Array.isArray(data) || data.length === 0) {
      return res.status(400).json({
        is_success: false,
        message: '"data" should be a non-empty array.',
      });
    }

    const numbers = data.filter((item) => /^\d+$/.test(item));
    const alphabets = data.filter((item) => /^[a-zA-Z]$/.test(item));
    const lowercaseAlphabets = alphabets.filter((item) => /^[a-z]$/.test(item));

    const highestLowercaseAlphabet =
      lowercaseAlphabets.length > 0
        ? [lowercaseAlphabets.sort().reverse()[0]]
        : [];

    res.json({
      is_success: true,
      user_id: `${fullName}_${dob}`,
      email: "john@xyz.com",
      roll_number: "ABCD123",
      numbers,
      alphabets,
      highest_lowercase_alphabet: highestLowercaseAlphabet,
    });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({
      is_success: false,
      message: "Internal Server Error",
    });
  }
});

// GET /bfhl endpoint (optional)
app.get("/bfhl", (req, res) => {
  res.json({
    operation_code: 1,
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
