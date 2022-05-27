const { Router } = require("express");
const authentication = require("../../middleware/authentication");

const router = Router()

const { create, verifyOtp, profile, subscriptionCreate, subscriptionCheck, updateCoin, updateProfile } = require("../controllers/user.contoller");

router.route("/create").post(create);
router.route("/verify").post(verifyOtp);
router.route("/profile").get(authentication, profile)
router.route("/subscription").post(subscriptionCreate)
router.route("/subscription/:email").get(subscriptionCheck)
router.route("/coin/:email").patch(updateCoin)
router.route("/update/profile/:id").patch(updateProfile)

module.exports = router;
