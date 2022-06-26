const taxModel = require("../model/taxModel");
const taxPayerModel = require("../model/taxPayerModel");


// **************************************************** Get Accountant By Id **********************************************************


const taxPay = async (req, res) => {
    try {
        let id = req.params.id
        if ((req.taxPayerId != req.params.id)) {
            return res.status(403).send({ status: false, msg: "You are not a Tax Payer" })
        }

        let UT = ["Andaman and Nicobar", "Chandigarh", "Daman and Diu", "Dadar and Nagar Haveli", "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep"]

        const taxPayer = await taxPayerModel.findOne({ _id: id, isDeleted: false })
        if (!taxPayer) return res.status(404).send({ status: false, message: "Tax Payer Doesn't Exist" });

        const taxDetails = await taxModel.findOne({ userId: id, isDeleted: false })
        const cantralTax = function (income) {
            let tax = 0;
            if (income < 500000) { tax = 0; }
            if (income >= 500000 && income < 1000000) { tax = (income * 5) / 100; }
            if (income >= 1000000 && income < 1500000) { tax = (income * 10) / 100; }
            if (income >= 1500000 && income < 2000000) { tax = (income * 15) / 100; }
            if (income >= 2000000) { tax = (income * 20) / 100; }
            return tax;
        }

        if (taxDetails) {
            if (!(UT.includes(taxPayer.state))) {
                let tax = cantralTax(taxPayer.income)
                let cgst = (tax * 5) / 100;
                let sgst = (tax * 10) / 100;
                let taxData = {
                    userId: id,
                    date: new Date(),
                    CGST: cgst,
                    SGST: sgst,
                    totalTax: cgst + sgst,
                    taxStatus: "New"
                }
                const taxDetails = await taxModel.findOneAndUpdate({ userId: id }, taxData, { new: true })
                return res.status(200).send({ status: true, message: "Tax Details", data: taxDetails })
            }

            if (UT.includes(taxPayer.state)) {
                let tax = cantralTax(taxPayer.income)
                let cgst = (tax * 5) / 100;
                let sgst = 0;
                let taxData = {
                    userId: id,
                    date: new Date(),
                    CGST: cgst,
                    SGST: sgst,
                    totalTax: cgst + sgst,
                    taxStatus: "New"
                }
                const taxDetails = await taxModel.findOneAndUpdate({ userId: id }, taxData, { new: true })
                return res.status(200).send({ status: true, message: "Tax Details", data: taxDetails })
            }
        }

        if (!taxDetails) {
            if (!(UT.includes(taxPayer.state))) {
                let tax = cantralTax(taxPayer.income)
                let cgst = (tax * 5) / 100;
                let sgst = (tax * 10) / 100;
                let taxData = {
                    userId: id,
                    date: new Date(),
                    CGST: cgst,
                    SGST: sgst,
                    totalTax: cgst + sgst,
                }
                const taxDetails = await taxModel.create(taxData)
                return res.status(200).send({ status: true, message: "Tax Details", data: taxDetails })
            }

            if (UT.includes(taxPayer.state)) {
                let tax = cantralTax(taxPayer.income)
                let cgst = (tax * 5) / 100;
                let sgst = 0;
                let taxData = {
                    userId: id,
                    date: new Date(),
                    CGST: cgst,
                    SGST: sgst,
                    totalTax: cgst + sgst,
                }
                const taxDetails = await taxModel.create(taxData)
                return res.status(200).send({ status: true, message: "Tax Details", data: taxDetails })
            }
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ status: false, message: error.message })
    }
}


// **************************************************** Get Accountant By Id **********************************************************


const editTaxPayer = async function (req, res) {
    try {

        if ((req.role == "Tax Payer")) {
            return res.status(403).send({ status: false, msg: "Only Tax Accountant and Admin are allowed for this job" })
        }
        let data = req.body

        const updatedData = await taxModel.findOneAndUpdate({ userId: data.userId }, data, { new: true })
        return res.status(200).send({ status: true, data: updatedData })
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}


// **************************************************** Get Accountant By Id **********************************************************


const getTaxDetailsById = async function (req, res) {
    try {

        let id = req.params.id
        const user = await taxPayerModel.findOne({ _id: id })
        if (!user) { return res.status(400).send({ status: false, msg: "Use a valid User Id" }) }

        let userTax = await taxModel.findOne({ userId: id }).populate("userId")
        return res.status(200).send({ status: true, data: userTax })
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}



// **************************************************** Get Tax Details By Filter **********************************************************


const getTaxDetailsFilter = async function (req, res) {
    try {
        if ((req.role == "Tax Payer")) {
            return res.status(403).send({ status: false, msg: "Only Tax Accountant and Admin are allowed for this job" })
        }
        let filter = req.query
        // filter = { userId, data, taxStatus }

        const filteredProducts = await taxModel.find(filter)
        return res.status(200).send({ status: true, count: filteredProducts.length, data: filteredProducts })
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}



module.exports = {
    taxPay,
    editTaxPayer,
    getTaxDetailsById,
    getTaxDetailsFilter
}