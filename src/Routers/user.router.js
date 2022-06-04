const { Router } = require("express");
const authentication = require("../../middleware/authentication");

const router = Router()

const { create, verifyOtp, profile, updateProfile } = require("../controllers/user.contoller");

router.route("/create").post(create);
router.route("/verify").post(verifyOtp);
router.route("/profile").get(authentication, profile)
router.route("/update/profile").patch(authentication, updateProfile)

module.exports = router;
