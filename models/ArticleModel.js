const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: ""
  }
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
