const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config(); // ✅ Load .env before anything else

const app = express();

app.use(cors({
  origin: "https://pvplates.netlify.app",
  credentials: true
}));

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));

// ✅ Database connection
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "weddingplates", // 🔥 Force DB name if needed
  })
  .then(() => console.log("MongoDB Connected to weddingplates"))
  .catch((err) => console.error("MongoDB Error:", err));

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
