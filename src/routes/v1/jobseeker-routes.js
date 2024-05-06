const express = require("express");
const router = express.Router();
const passport = require("passport");
require("../../utils/common/passport");

const { JobSeekerController } = require("../../controllers");
const upload = require("../../utils/helpers/file-upload");
const { ErrorResponse } = require("../../utils/common");
const AppError = require("../../utils/errors/app-error");

router.post("/", JobSeekerController.createJobSeeker);

router.post(
  "/resume-upload",
  passport.checkAuth,
  function (req, res, next) {
    upload.single("resume")(req, res, function (error) {
      if (error instanceof AppError) {
        ErrorResponse.message = error.message;
        ErrorResponse.error = error.explanation;
        return res.status(error.statusCode).json(ErrorResponse);
      } else if (error) {
        ErrorResponse.message = error.message;
        return res.status(500).json(ErrorResponse);
      }
      // Everything went fine.
      next();
    });
  },
  JobSeekerController.addResumeToJobSeeker
);

router.get(
  "/resume",
  passport.checkAuth,
  JobSeekerController.getResumesByJobSeekerUserId
);

router.delete("/resume", passport.checkAuth, JobSeekerController.deleteResume);

router.post(
  "/video-upload",
  passport.checkAuth,
  function (req, res, next) {
    upload.single("video")(req, res, function (error) {
      if (error instanceof AppError) {
        ErrorResponse.message = error.message;
        ErrorResponse.error = error.explanation;
        return res.status(error.statusCode).json(ErrorResponse);
      } else if (error) {
        ErrorResponse.message = error.message;
        return res.status(error.statusCode).json(ErrorResponse);
      }
      // Everything went fine.
      next();
    });
  },
  (req, res) => {
    res.send("ok");
  }
);

router.post("/profile", JobSeekerController.getJobSeekerProfileByUserId);

router.post("/education", JobSeekerController.addEducationToJobSeeker);

router.post("/experience", JobSeekerController.addExperienceToJobSeeker);

// router.patch("/:id", JobSeekerController.updateCity);

module.exports = router;
