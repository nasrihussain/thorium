
const express = require('express');

const router = express.Router();
const productController = require('../controllers/productController');
const userController = require('../controllers/userController');
const middlewares = require('../middleware/middleware');
const orderController = require('../controllers/orderController')

//  POST api to create a product

router.post('/createProduct', productController.createProduct)

//   POST api to create a user that takes user details from the request body.

router.post('/createUser', middlewares.validation, userController.createUser)

// POST api for order purchase that takes a userId and a productId in request body

router.post('/createOrder', middlewares.validation, orderController.createOrder);

module.exports = router;