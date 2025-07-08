const Order = require("../models/Order");

exports.placeOrder = async (req, res) => {
  try {
    const { products, customerName, email, phone, address } = req.body;

    const newOrder = new Order({
      products,
      customerName,
      email,
      phone,
      address,
    });

    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.markAsPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    order.isPaid = true;
    await order.save();
    res.json({ message: "Order marked as paid", order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
