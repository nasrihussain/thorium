const express = require('express');
const router = express.Router();
const UserController = require("../controllers/userController")
const BookController = require("../controllers/bookController")
const ReviewController = require("../controllers/reviewcontroller")
const { authentication, authorisation} = require('../middleware/auth');


//Book Cover
const aws = require("aws-sdk")
aws.config.update(
    {
        accessKeyId: "AKIAY3L35MCRVFM24Q7U",
        secretAccessKey: "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",
        region: "ap-south-1"
    }
)

let uploadFile = async (file) => {
    return new Promise( function(resolve, reject) {
        let s3 = new aws.S3({ apiVersion: "2006-03-01" }) 
        var uploadParams = {
            ACL: "public-read",
            Bucket: "classroom-training-bucket", 
            Key: "Taabish/" + file.originalname,
            Body: file.buffer
        }

      s3.upload(uploadParams, function (err, data) {
            if (err) { 
                return reject({ "error": err }) 
            }

            console.log(data)
            console.log(" file uploaded succesfully ")
            return resolve(data.Location)
          }
        )

    }
    )
}

router.post("/write-file-aws", async function (req, res) {
    try {
        let files = req.files
        if (files && files.length > 0) {
            let uploadedFileURL = await uploadFile(files[0])
            res.status(201).send({ msg: "file uploaded succesfully", data: uploadedFileURL })
        }
        else {
            res.status(400).send({ msg: "No file found" })
        }
    }
    catch (err) {
        res.status(500).send({ msg: err })
    }
}
)

//▶User API.............
router.post("/register", UserController.createUser);
router.post("/login", UserController.loginUser)


//▶Book API..............
router.post('/books',authentication, BookController.createBook);
router.get('/books',authentication, BookController.getBooks);
router.get('/books/:bookId',authentication, BookController.getBookById);
router.put('/books/:bookId',authentication,authorisation, BookController.updateBook);
router.delete('/books/:bookId',authentication,authorisation, BookController.deleteBookById);


//▶Review API.............
router.post('/books/:bookId/review', ReviewController.createReview);
router.put('/books/:bookId/review/:reviewId', ReviewController.updateReviews);
router.delete('/books/:bookId/review/:reviewId', ReviewController.deleteReviewById);


module.exports = router;