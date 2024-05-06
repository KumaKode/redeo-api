const express = require("express");
const passport = require("passport");
require("../../utils/common/passport");

const { InfoController } = require("../../controllers");
const countryRoutes = require("./country-routes");
const cityRoutes = require("./city-routes");
const stateRoutes = require("./state-routes");
const userRoutes = require("./user-routes");
const jobSeekerRoutes = require("./jobseeker-routes");
const { UserMiddlewares } = require("../../middlewares");

const router = express.Router();

router.post("/info", UserMiddlewares.validateDOB, InfoController.info);
router.use("/countries", countryRoutes);
router.use("/states", stateRoutes);
router.use("/cities", cityRoutes);
router.use("/users", userRoutes);
router.use("/jobseekers", jobSeekerRoutes);

module.exports = router;
