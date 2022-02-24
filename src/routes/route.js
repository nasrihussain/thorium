const express = require('express');
const router = express.Router();

let persons = [
  {
      name: "Nasir",
      age: 10,
      votingStatus: false
  },
  {
      name: "Sohail",
      age: 20,
      votingStatus: false
  },
  {
      name: "Ayush",
      age: 70,
      votingStatus: false
  },
  {
      name: "Amir",
      age: 25,
      votingStatus: false
  },
  {
      name: "Himashu",
      age: 30,
      votingStatus: false
  }
]

router.post("/vote-post", function (req, res) {
  let votingAge = req.query.votingAge

  let newArray=[];
  for (let i = 0; i < persons.length; i++) {

      if (persons[i].age > votingAge) {
      
          persons[i].votingStatus = true
          newArray.push(persons[i])
      }
  }
if (newArray.length>0)
{
  return res.send(newArray)
}
else{
  return res.send("no member found above this age")
}

})



module.exports = router;
