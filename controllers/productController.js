const Product = require("../models/ProductModel");
const Article = require("../models/ArticleModel");

const productCtrl = {
  createProduct: async (req, res) => {
    const { articleId, name, garnitures, price} = req.body;

    try {
      // Recherche de l'article correspondant
      const article = await Article.findOne({ _id: articleId });

      if (!article) {
        console.log("Article not found:", articleId);
        return res.status(404).json({
          success: false,
          message: "Article not found",
        });
      } else {
        // Création du produit avec les détails appropriés
        const product = new Product({
          article: articleId,
          name,
          garnitures,
          price,
        });

        await product.save();

        return res.status(201).json({
          success: true,
          message: "Product created successfully",
          data: product,
        });
      }
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },
  fetchProduct: async (req, res) => {
    try {
      const product = await ArticleModel.find();
      if (product.length > 0) {
        res.status(200).json({
          code: 200,
          description: "Product récupérés avec succès",
          data: product,
          success: true,
          requestDate: Date.now(),
        });
      } else {
        res.status(404).json({
          code: 404,
          description: "Aucun produit trouvé",
          success: false,
          requestDate: Date.now(),
        });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = productCtrl;
