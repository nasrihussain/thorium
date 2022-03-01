const express = require('express');

const router = express.Router();


const controller = require('../controllers/controller')



router.post('/createAuthor', controller.createAuthor)
router.post('/createBook', controller.createBook)
router.get('/bookByChetan', controller.bookByChetan)
router.post('/priceUpdate', controller.priceUpdate)
router.get('/booksInPrice', controller.booksInPrice)

module.exports = router;