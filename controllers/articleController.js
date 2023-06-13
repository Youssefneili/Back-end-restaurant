const ArticleModel = require("../models/ArticleModel");
const { v4: uuidv4 } = require("uuid");
const articleCtrl = {
  addArticle: async (req, res) => {
    try {
      const { name, type, price } = req.body;
      if (!name || !type || !price) {
        res.status(400).json({
          code: 400,
          description: "Veuillez ajouter des informations supplimentaires",
          success: false,
          requestDate: Date.now(),
        });
      } else {
        const article = new ArticleModel({
          id: uuidv4(),
          name: name,
          type: type,
          price: price,
        });
        await article.save();
        res.status(200).json({
          code: 200,
          description: "article ajouter avec success",
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
      const article = await ArticleModel.find();
      if (article) {
        res.status(200).json({
          code: 200,
          description: "article ajouter avec success",
          data: article,
          success: true,
          requestDate: Date.now(),
        });
      } else {
        res.status(404).json({
          code: 404,
          description: "article introuvable",
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
      const { id, name, type, price, isActive } = req.body;
      const article = await ArticleModel.findOne({ _id: id });

      if (article) {
        article.name = name || article.name;
        article.type = type || article.type;
        article.price = price || article.price;
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
      const article = await ArticleModel.findOne({ id: id });

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
