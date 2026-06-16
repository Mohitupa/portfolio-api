require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

/**
 * Middleware
 */
app.use(cors());
app.use(express.json());

/**
 * Test Route
 */
app.get("/api/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Portfolio API is running"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});