const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  description: { type: String, required: true },
  outOfStock: { type: Boolean, default: false },

  category: {
    type: String,
    enum: ["dolls", "plate", "gift", "jute"],
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
