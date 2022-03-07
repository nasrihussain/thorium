const userModel = require("../models/userModel")


const createUser = async function(req, res) {
    let userData = req.body
    userData.freeAppUser = req.isFreeAppUser
    let savedData = await userModel.create(userData)
    res.send({ createdUser: savedData })
}

module.exports.createUser = createUser