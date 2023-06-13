const express = require("express");
const router = express.Router();
const productCtrl = require("../controllers/productController");

// Route pour créer un produit en fonction du type d'article
router.post("/create", productCtrl.createProduct);
router.post("/fetchProduct", productCtrl.fetchProduct);

module.exports = router;
