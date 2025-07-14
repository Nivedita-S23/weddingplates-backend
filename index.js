// index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

// 🔒 Security middlewares
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xssClean = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");

dotenv.config();
const app = express();

// CORS: restrict to your Netlify domain
app.use(cors({ origin: "https://pvplates.netlify.app" }));

// Security headers
app.use(helmet());

// Parse JSON body
app.use(express.json({ limit: "10kb" }));

// Prevent NoSQL injection
app.use(mongoSanitize()); // sanitizes req.body, .query, .params :contentReference[oaicite:1]{index=1}

// Prevent XSS attacks
app.use(xssClean()); // cleans user input :contentReference[oaicite:2]{index=2}

// Prevent HTTP parameter pollution
app.use(hpp());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);

// Serve static uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 🛤 Your routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));

// DB connection & server
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(console.error);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


