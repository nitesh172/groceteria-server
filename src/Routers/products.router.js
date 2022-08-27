const { Router } = require("express");
const {uploadSingle} = require('../middleware/multer')

const router = Router()

const { create, deleteProduct } = require("../controllers/product.controller");

router.route("/create").post(uploadSingle("productImgUrl"), create);
router.route("/delete/:id").delete(deleteProduct);

module.exports = router;
