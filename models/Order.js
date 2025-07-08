const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      name: String,
      quantity: Number,
      price: Number,
    }
  ],
  customerName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  isPaid: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
