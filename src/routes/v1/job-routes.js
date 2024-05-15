const express = require("express");
const router = express.Router();
const passport = require("passport");
require("../../utils/common/passport");

const { JobController } = require("../../controllers");

router.post("/", JobController.postJob);

router.post("/apply", JobController.applyJob);

module.exports = router;
