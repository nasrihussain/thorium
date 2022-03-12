const userModel = require('../models/userShema.js')

const createUser = async function (req, res) {
    let user = await userModel.create(req.body)
    
    res.send({user: user})
}


module.exports.createUser= createUser;