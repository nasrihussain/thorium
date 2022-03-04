const testOne=async function(req,res){
    res.send({msg:"first api passes globalmiddleware "})
}

const testTwo=async function(req,res){
res.send({msg:"2nd one passed globalmiddleware"})
}







module.exports.testOne= testOne
module.exports.testTwo= testTwo