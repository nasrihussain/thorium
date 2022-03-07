const productModel = require("../models/productModel")

const createProduct = async function(req , res){

    let productData = req.body
    let savedData = await productModel.create(productData)
    res.send({ product: savedData })
}

module.exports.createProduct = createProduct