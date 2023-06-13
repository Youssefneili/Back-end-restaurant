const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  article: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Article',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  garnitures: {
    type: [String],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
