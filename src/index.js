const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');
const app = express();

app.use(bodyParser.json()); // to conver into json
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req,res,next){
    const dateTime = new Date()+""
    const IP =req.ip;
    const hitApi = req.url; 
    console.log(`timestamp: ${dateTime}`)
    console.log(`IP address ${IP}`)
    console.log(`fired API localhost:3000${hitApi}`)
    next()
})





mongoose.connect("mongodb+srv://nasirhussain7878:llo5gS70CAxajLIs@cluster0.neahs.mongodb.net/Nasir78-DB?authSource=admin&replicaSet=atlas-udybrv-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )



app.use('/', route);



app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});


