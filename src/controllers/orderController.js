const OrderModel = require('../models/orderSchema')
const ProductModel = require('../models/productSchema')
const userModel = require('../models/userSchema')

const createOrder = async function (req, res) {
    let data= req.body;
    let uId = data.userId;
    let pId = data.productId;
    let freeAppUser = req.headers.isfreeappuser;
    console.log(freeAppUser)

    let user =await userModel.findById(uId);
    let product= await ProductModel.findById(pId);

    if(data.hasOwnProperty("userId") == false){
        res.send({error: "userID is required"});
    } else if(!user) {
        res.send({error: "wrong userID entered"});
    }
    if(data.hasOwnProperty("productId") == false){
        res.send({error: "productId is required"})
    } else if(!product){
        res.send({error: " wrong productID entered"})
    }
    let productDetail = await ProductModel.findById(pId);
    console.log(productDetail);
    let priceValue = productDetail.price;
    console.log(priceValue);
    let userDetail = await UerModel.findById(uId)
    let userBalance = userDetail.balance;

    if(freeAppUser ==="false"){
        if(userBalance > priceValue){
            let updateBalance = await userModel.findByIdAndUpdate(
                { _id: uId },
                { $inc: {  balance: -priceValue }},
                {  new: true }               
            );

            data.amount = priceValue;
            data.isfreeappuser = false;
            let orderDetail =await OrderModel.create(data);
            res.send({order: orderDetail});
        }
            else{
                res.send({error: "insufficient balance"})
            }
            }else{
                data.amount=0;
                data.amount= true
                let orderDetails = await OrderModel.create(data);
                res.send({order:orderDetails})
            }
    }
module.exports.createOrder= createOrder
