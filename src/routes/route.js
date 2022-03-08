const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const middleware=require("../middleware/mid")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/users",middleware.mid, userController.createUser  )

router.post("/login",middleware.mid, userController.loginUser)

router.get("/users/:userId",middleware.mid,userController.getUserData)
router.put("/users/:userId", userController.updateUser)

router.delete("/delete/:userId",userController.deleteUser)

module.exports = router;