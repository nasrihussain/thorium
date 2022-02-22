// const express = require('express');
// const router = express.Router();

// router.get('/students/:name', function (req, res) {
// let studentsName = req.params.name;
// console.log(studentsName)
// res.send("35423")

// });

const express = require('express');
const router = express.Router();

//1. This API will fetch all movies from array
router.get('/movies', function (req, res) {

res.send('["3Idiots","Avengers","thor","interstellar","Fan","Dilwale"]')
});

//2.This API will fetch all movie by indexId from array
router.get('/movies/:movieId', function (req, res) {
    mov=["3Idiots","Avengers","thor","interstellar","Fan","Dilwale"];
    let value = req.params.movieId;
    if(value>mov.length-1){
        res.send('"does not exit"')
    }else{
        res.send(mov[value])
    }
    });
    
//This API  will fetch all movies from array all objects
router.get('/moviez', function (req, res) {
    res.send([ {id: 1,name: 'thor'}, {id: 2,name: 'Fan'}, {id: 3,name: 'Avengers'}, {id: 4,name: 'the Shining'}, {id: 5,name: 'Dilwale'}])
 
    });

    //4.This API will fetch all movies from array of objects by indexId
    router.get('/films/:filmId', function (req, res) {
        let movi = [ {id: 1,name: 'thor'}, {id: 2,name: 'Fan'}, {id: 3,name: 'Avengers'}, {id: 4,name: 'the Shining'}, {id: 5,name: 'Dilwale'}]
        let value = req.params.filmId;
        let found=false;
        for(i=0;i<movi.length;i++){
            if(movi[i].id==value){
                found=true;
                res.send(movi[i])
                break;
            }
        }
        if(found==false){
            res.send('No movie found with this id')
        }
    })


module.exports = router;