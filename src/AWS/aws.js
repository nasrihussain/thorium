const aws = require("aws-sdk");

aws.config.update(
    {
        accessKeyId: "AKIAY3L35MCRVFM24Q7U",
        secretAccessKey: "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",
        region: "ap-south-1"
    }
)

let uploadFile = async (file) => {
    // console.log(file)
    return new Promise( function(resolve, reject) {
      
        let s3 = new aws.S3({ apiVersion: "2006-03-01" })
    
        var uploadParams = {
            ACL: "public-read",
            Bucket: "classroom-training-bucket", 
            Key: "Nasir/" + file.originalname,
            Body: file.buffer
        }
//console.log(uploadFile)
      s3.upload(uploadParams, function (err, data) {
            if (err) { 
                return reject({ "error": err }) 
            }

            return resolve(data) 
          }
        )

    }
    )
}

module.exports = {
    uploadFile
}

// router.post("/write-file-aws", async function (req, res) {
//     try {
//         let files = req.files
//         if (files && files.length > 0) {
//             let uploadedFileURL = await uploadFile(files[0])
//             res.status(201).send({ msg: "file uploaded succesfully", data: uploadedFileURL })
//         }
//         else {
//             res.status(400).send({ msg: "No file found" })
//         }
//     }
//     catch (err) {
//         res.status(500).send({ msg: err })
//     }
// }
//)