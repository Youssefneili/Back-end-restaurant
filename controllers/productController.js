const fs = require("fs");
const Product = require('../models/ProductModel');

const productCtrl = {
    addProduct: async (req, res) => {
        try {
            const { name, garnitures, price } = req.body;
            const image = req.file;

            if (!name || !garnitures || !image || !price) {
                fs.unlinkSync(image.path);
                return res.status(400).json({
                    code: 400,
                    description: "Something missing",
                    success: false,
                });
            }

            const product = new Product({
                name: name,
                garnitures: garnitures,
                image: image.filename,
                price: price,
            });

            await product.save();

            return res.status(200).json({
                code: 200,
                description: 'Product added successfully',
                success: true,
                data: product,
            });
        } catch (err) {
            console.log('Error', err);
            return res.status(500).json({ msg: err.message });
        }
    },
    fetchProduct: async (req, res) => {
        try {
            const products = await Product.find();
            if (products.length > 0) {
                res.status(200).json({
                    code: 200,
                    description: "Produits récupérés avec succès",
                    data: products,
                    success: true,
                });
            } else {
                res.status(404).json({
                    code: 404,
                    description: "Aucun produit trouvé",
                    success: false,
                });
            }
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
};

module.exports = productCtrl;
