const { Router } = require("express");

const router = Router()

const { createCustomization, setup } = require("../controllers/brand.controller");

router.route("").post(createCustomization);
router.route("/setup").get(setup);

module.exports = router;
