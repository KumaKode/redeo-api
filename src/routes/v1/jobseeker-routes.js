const express = require("express");
const router = express.Router();
const passport = require("passport");
require("../../utils/common/passport");

const { JobSeekerController } = require("../../controllers");
const upload = require("../../utils/helpers/file-upload");
const { ErrorResponse } = require("../../utils/common");
const AppError = require("../../utils/errors/app-error");

router.post("/", passport.checkAuth, JobSeekerController.createJobSeeker);

router.get(
  "/profile",
  passport.checkAuth,
  JobSeekerController.getJobSeekerProfileByUserId
);

router.patch(
  "/profile",
  passport.checkAuth,
  JobSeekerController.updateJobSeekerProfile
);

router.get("/", JobSeekerController.getAllJobSeekers);

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

router.delete(
  "/resume/:id",
  passport.checkAuth,
  JobSeekerController.deleteResume
);

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
        return res.status(500).json(ErrorResponse);
      }
      // Everything went fine.
      next();
    });
  },
  JobSeekerController.addVideoToJobSeeker
);

router.post(
  "/video",
  passport.checkAuth,
  JobSeekerController.getVideosByJobSeekerUserId
);

router.delete(
  "/video/:id",
  passport.checkAuth,
  JobSeekerController.deleteVideo
);

router.post(
  "/education",
  passport.checkAuth,
  JobSeekerController.addEducationToJobSeeker
);

router.get(
  "/education",
  passport.checkAuth,
  JobSeekerController.getEducationsByJobSeekerUserId
);

// router.post(
//   "/educationId",
//   passport.checkAuth,
//   JobSeekerController.getEducationByJobSeekerId
// );

router.delete(
  "/education/:id",
  passport.checkAuth,
  JobSeekerController.deleteEducation
);

router.patch(
  "/education/:id",
  passport.checkAuth,
  JobSeekerController.updateEducation
);

router.post(
  "/experience",
  passport.checkAuth,
  JobSeekerController.addExperienceToJobSeeker
);

router.get(
  "/experience",
  passport.checkAuth,
  JobSeekerController.getExperiencesByJobSeekerUserId
);

// router.post(
//   "/experienceId",
//   passport.checkAuth,
//   JobSeekerController.getExperienceByJobSeekerId
// );

router.delete(
  "/experience/:id",
  passport.checkAuth,
  JobSeekerController.deleteExperience
);

router.patch(
  "/experience/:id",
  passport.checkAuth,
  JobSeekerController.updateExperience
);

module.exports = router;
