const fs = require("fs");
const Article = require("../models/ArticleModel");
const { v4: uuidv4 } = require("uuid");

const articleCtrl = {
  addArticle: async (req, res) => {
    try {
      const { type } = req.body;
      const image = req.file;

      if (!type || !image) {
        fs.unlinkSync(image.path);
        return res.status(400).json({
          code: 400,
          description: "Veuillez ajouter des informations supplémentaires",
          success: false,
          requestDate: Date.now(),
        });
      }

      const article = new Article({
        id: uuidv4(),
        type: type,
        image: image.filename,
      });

      await article.save();

      res.status(200).json({
        code: 200,
        description: "Article ajouté avec succès",
        success: true,
        requestDate: Date.now(),
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  fetchArticle: async (req, res) => {
    try {
      const articles = await Article.find();
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
      const { id, type, image } = req.body;
      console.log('Received request to update article:', id, type, image);
  
      const article = await Article.findOne({ _id: id });
      console.log('Retrieved article:', article);
  
      if (article) {
        article.type = type || article.type;
        article.image = image || article.image;
        await article.save();
        console.log('Article updated:', article);
  
        res.status(200).json({
          code: 200,
          description: 'Article mis à jour avec succès',
          data: article,
          success: true,
          requestDate: Date.now(),
        });
      } else {
        console.log('Article not found');
        res.status(404).json({
          code: 404,
          description: 'Article introuvable',
          success: false,
          requestDate: Date.now(),
        });
      }
    } catch (err) {
      console.error('Error occurred:', err);
      return res.status(500).json({ msg: err.message });
    }
  },
  
  

  deleteArticle: async (req, res) => {
    try {
      const id = req.params.id;
      const article = await Article.findOneAndDelete({ _id: id });
  
      if (article) {
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
