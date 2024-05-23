const express = require("express");
require("../../utils/common/passport");

const { InfoController } = require("../../controllers");

const countryRoutes = require("./country-routes");
const cityRoutes = require("./city-routes");
const stateRoutes = require("./state-routes");
const userRoutes = require("./user-routes");
const jobSeekerRoutes = require("./jobseeker-routes");
const skillRoutes = require("./skill-routes");
const employerRoutes = require("./employer-routes");
const jobRoutes = require("./job-routes");
const socialLinkRoutes = require("./sociallinks-routes");

const router = express.Router();

router.post("/info", InfoController.info);
router.use("/countries", countryRoutes);
router.use("/states", stateRoutes);
router.use("/cities", cityRoutes);
router.use("/users", userRoutes);
router.use("/jobseekers", jobSeekerRoutes);
router.use("/skills", skillRoutes);
router.use("/employers", employerRoutes);
router.use("/jobs", jobRoutes);
router.use("/sociallinks", socialLinkRoutes);

module.exports = router;
