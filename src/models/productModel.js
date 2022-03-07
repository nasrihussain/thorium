const mongoose = require('mongoose');

const productSchema = new mongoose.Schema( {
    productName: String,

    categoryName:String,

    price: {
        type: String,

        default: 100,
    },

}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema)

