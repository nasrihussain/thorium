const jwt = require("jsonwebtoken")
let mid=function(req,res,next){
    let xAuthToken = req.headers["x-auth-token"]
    if( xAuthToken != undefined){
        console.log("done")
        next()
    }
    else{
        res.send("request is missing a mandatory header")
    }
}
module.exports.mid = mid;