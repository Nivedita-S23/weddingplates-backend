const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// 🔐 Register new user
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔓 Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // ✅ Admin shortcut login
    if (email === "pvplatedecoration@gmail.com" && password === "Paramusns@25112025uP%#") {
      return res.json({ role: "admin", name: "Admin", email });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid password" });

    res.json({
      role: "user",
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
