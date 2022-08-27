const { Router } = require("express");
const {uploadSingle} = require('../middleware/multer')

const router = Router()

const { create } = require("../controllers/product.controller");

router.route("/create").post(uploadSingle("productImgUrl"), create);

module.exports = router;
