const express = require("express");
const router = express.Router();
const passport = require("passport");
require("../../utils/common/passport");

const { EmployerController } = require("../../controllers");

router.post("/", passport.checkAuth, EmployerController.createEmployer);

router.get(
  "/profile",
  passport.checkAuth,
  EmployerController.getEmployerProfileByUserId
);

router.patch(
  "/profile/:id",
  passport.checkAuth,
  EmployerController.updateEmployerProfile
);

router.get("/", EmployerController.getAllEmployers);

module.exports = router;
