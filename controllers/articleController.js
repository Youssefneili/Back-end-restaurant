const ArticleModel = require("../models/ArticleModel");
const { v4: uuidv4 } = require("uuid");

const articleCtrl = {
  addArticle: async (req, res) => {
    try {
      const { type, image } = req.body;
      if (!type || !image) {
        res.status(400).json({
          code: 400,
          description: "Veuillez ajouter des informations supplémentaires",
          success: false,
          requestDate: Date.now(),
        });
      } else {
        const article = new ArticleModel({
          id: uuidv4(),
          type: type,
          image: image,
        });
        await article.save();
        res.status(200).json({
          code: 200,
          description: "Article ajouté avec succès",
          success: true,
          requestDate: Date.now(),
        });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  fetchArticle: async (req, res) => {
    try {
      const articles = await ArticleModel.find();
      if (articles.length > 0) {
        res.status(200).json({
          code: 200,
          description: "Articles récupérés avec succès",
          data: articles,
          success: true,
          requestDate: Date.now(),
        });
      } else {
        res.status(404).json({
          code: 404,
          description: "Aucun article trouvé",
          success: false,
          requestDate: Date.now(),
        });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  updateArticle: async (req, res) => {
    try {
      const { id, type, image, isActive } = req.body;
      const article = await ArticleModel.findOne({ _id: id });

      if (article) {
        article.type = type || article.type;
        article.image = image || article.image;
        article.isActive = isActive || article.isActive;
        await article.save();
        res.status(200).json({
          code: 200,
          description: "Article mis à jour avec succès",
          data: article,
          success: true,
          requestDate: Date.now(),
        });
      } else {
        res.status(404).json({
          code: 404,
          description: "Article introuvable",
          success: false,
          requestDate: Date.now(),
        });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  deleteArticle: async (req, res) => {
    try {
      const id = req.params.id;
      const article = await ArticleModel.findOne({ _id: id });

      if (article) {
        article.isArchived = true;
        await article.save();
        res.status(200).json({
          code: 200,
          description: "Article supprimé avec succès",
          data: article,
          success: true,
          requestDate: Date.now(),
        });
      } else {
        res.status(404).json({
          code: 404,
          description: "Article introuvable",
          success: false,
          requestDate: Date.now(),
        });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = articleCtrl;
