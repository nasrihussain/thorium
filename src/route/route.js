const express = require("express")
const router = express.Router()
const { authAdmin, authAccountant, authTaxPayer } = require("../middlware/auth")
const { createAnotherAdmin, createAccountant, createTaxPayer, getAllTaxPayer, getTaxPayerById, getAccountantById } = require("../controller/userController")
const loginController = require("../controller/loginController")
const { taxPay, editTaxPayer, getTaxDetailsById, getTaxDetailsFilter } = require("../controller/taxController")


// Default Admin: {
//     id: 62b82b61d73d64af7ce2eeee,
//     email : "amirsohelsk07@gmail.com",
//     password : Sohel@02
// }
router.post('/registerAdmin', authAdmin, createAnotherAdmin)

router.post('/registerAccountant', authAdmin, createAccountant)
router.post('/registerTaxPayer', createTaxPayer)
router.get('/getAllTaxPayer', authAdmin, getAllTaxPayer)
router.get('/getTaxPayerById/:id', authTaxPayer, getTaxPayerById)
router.get('/getAccountantById/:id', authAccountant, getAccountantById)



router.post('/taxPay/:id', authTaxPayer, taxPay)
router.put('/updateTaxData', authAdmin, authAccountant, editTaxPayer)
router.get('/getTaxDetailsById/:id', authTaxPayer, getTaxDetailsById)
router.get('/getTaxDetailsFilter', authAdmin, authAccountant, getTaxDetailsFilter)


router.post('/login', loginController.login)

module.exports = router
