
const productSchema = require("../models/productSchema.js")

const createProduct= async function (req, res) {
  let product= await ProductModel.create(req.body)
    res.send({product: product})
}



module.exports.createProduct= createProduct

