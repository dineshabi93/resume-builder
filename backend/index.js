const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: [
    "http://localhost:5173", // Keep this for local development
    "https://resume-builder-beta-peach.vercel.app" // Your Vercel frontend URL
  ],
  credentials: true // This is important for sending cookies/auth headers
} ));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/resume-builder", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log("MongoDB connection error:", err));

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/resumes", require("./routes/resumes"));
// app.use("/api/payments", require("./routes/payments")); // This line should remain commented out if you're deferring Razorpay

// Health check route
app.get("/", (req, res) => {
  res.json({ message: "Resume Builder API is running!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
