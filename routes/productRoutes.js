const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const productController = require("../controllers/productController");
router.get("/", productController.getAllProducts);
router.post("/add", upload.single("image"), productController.addProduct);
router.patch("/:id/out-of-stock", productController.updateOutOfStock);
router.delete("/:id", productController.deleteProduct);

// ✅ THIS MUST BE LAST
router.get("/:id", async (req, res) => {
  try {
    const product = await productController.getProductById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
