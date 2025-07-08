const Product = require("../models/Product");

// ADD PRODUCT
exports.addProduct = async (req, res) => {
  try {
    const { name, price, description, quantity, category } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "Image file is required." });
    }

    if (!name || !price || !description || !quantity || !category) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const imagePath = "/uploads/" + req.file.filename;

    const product = new Product({
      name,
      price,
      description,
      quantity,
      category,
      image: imagePath,
    });

    await product.save();
    res.status(201).json({ message: "Product added", product });
  } catch (err) {
    console.error("Error adding product:", err.message);
    res.status(400).json({ error: err.message });
  }
};

// GET ALL PRODUCTS
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE PRODUCT
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET PRODUCT BY ID
exports.getProductById = async (id) => {
  const product = await Product.findById(id);
  if (!product) throw new Error("Not found");
  return product;
};

// MARK PRODUCT AS OUT OF STOCK
exports.updateOutOfStock = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    product.quantity = 0;
    await product.save();
    res.json({ message: "Product marked as out of stock", product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
