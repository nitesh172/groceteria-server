var aws = require("aws-sdk")
var multer = require("multer")
var multerS3 = require("multer-s3")
require('dotenv').config()

var s3 = new aws.S3({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
})

console.log(s3)

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "groceteria",
    acl: "public-read",
    metadata: function (req, file, cb) {
      console.log(file.fieldname)
      cb(null, { fieldName: file.fieldname })
    },
    key: function (req, file, cb) {
      console.log(file.originalname)
      cb(null, Date.now() + "-" + file.originalname)
    },
  }),
})


const uploadSingle = (fieldName) => {
  return (req, res, next) => {
      const createUserFun = upload.single(fieldName);

      createUserFun(req, res, function (err) {
          if (err instanceof multer.MulterError) {
              // A Multer error occurred when uploading.
              res.send({ message: err.message, errorType: "MulterError" });
          } else if (err) {
              // An unknown error occurred when uploading.
              res.send({ message: err.message, errorType: "NormalError" });
          }
          // Everything went fine.
          next();
      });
  };
};

const uploadMultiple = (fieldName) => {
  return (req, res, next) => {
      const createUserFun = upload.array(fieldName);

      createUserFun(req, res, function (err) {
          if (err instanceof multer.MulterError) {
              // A Multer error occurred when uploading.
              res.send({ message: err.message, errorType: "MulterError" });
          } else if (err) {
              // An unknown error occurred when uploading.
              res.send({ message: err.message, errorType: "NormalError" });
          }
          // Everything went fine.
          next();
      });
  };
};

const fieldWise = (fieldNames) => {
  return (req, res, next) => {
    const createUserFun = upload.fields(fieldNames)

    createUserFun(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        res.send({ message: err.message, errorType: "MulterError" })
      } else if (err) {
        // An unknown error occurred when uploading.
        res.send({ message: err.message, errorType: "NormalError" })
      }
      // Everything went fine.
      console.log(fieldNames)
      next()
    })
  }
}

module.exports = {uploadSingle, uploadMultiple, fieldWise};