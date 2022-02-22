const express = require('express');
const router = express.Router();
const obj = require('../logger/logger')
const obj1 = require('../util/helper')
const obj2 = require('../validator/formatter')

router.get('/test-me', function (req, res) {

    obj.printMessage('Nasir hussain')
    res.send('My first ever api!')
});

router.get('/test-me1', function (req, res) {
    console.log(`Date : ${obj1.printDate}`)
    console.log(`Month : ${obj1.printMonth}`)
    console.log(obj1.prinBatch)
    res.send('My second api!')
});
router.get('/test-me2', function (req, res) {
    console.log(`my trim file ${obj2.afterTrim}`)
    console.log(`upperCase ${obj2.upperCase}`)
    console.log(`lowerCase ${obj2.lowerCase}`)
    res.send('My third api!')
});

module.exports = router;