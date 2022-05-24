const { Router } = require("express");
const authentication = require("../../middleware/authentication");

const router = Router()

const { create, verifyOtp, profile } = require("../controllers/user.contoller");

router.route("/create").post(create);
router.route("/verify").post(verifyOtp);
router.route("/profile").get(authentication, profile)

module.exports = router;
