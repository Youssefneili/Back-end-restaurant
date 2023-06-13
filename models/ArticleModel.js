const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({id: {
  type: String,
  required: true,
},

  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  
  
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
