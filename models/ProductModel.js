const mongoose = require ('mongoose');

const productShema = new mongoose.Schema ({
    name : {
        type : String,
        require : true,
    },
    garnitures : {
        type : [String],
        required:true,
    },
    image: {
        type: String,
        required: true
      },
    price : {
        type : Number,
        default : ""
    }
})
const Product = mongoose.model('Product', productShema);
module.exports = Product 