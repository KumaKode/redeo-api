const express = require("express");
const router = express.Router();
const passport = require("passport");
require("../../utils/common/passport");

const { JobSeekerController } = require("../../controllers");
const upload = require("../../utils/helpers/file-upload");
const { ErrorResponse } = require("../../utils/common");
const AppError = require("../../utils/errors/app-error");

router.post("/", passport.checkAuth, JobSeekerController.createJobSeeker);

router.post("/profile", JobSeekerController.getJobSeekerProfileByUserId);

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

router.post(
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
  JobSeekerController.addVideoToJobSeeker
);

router.post(
  "/video",
  passport.checkAuth,
  JobSeekerController.getVideosByJobSeekerUserId
);

router.delete("/video", passport.checkAuth, JobSeekerController.deleteVideo);

router.post(
  "/education",
  passport.checkAuth,
  JobSeekerController.addEducationToJobSeeker
);

router.post(
  "/educations",
  passport.checkAuth,
  JobSeekerController.getEducationsByJobSeekerUserId
);

router.post(
  "/educationId",
  passport.checkAuth,
  JobSeekerController.getEducationByJobSeekerId
);

router.delete(
  "/education",
  passport.checkAuth,
  JobSeekerController.deleteEducation
);

router.patch(
  "/education",
  passport.checkAuth,
  JobSeekerController.updateEducation
);

router.post(
  "/experience",
  passport.checkAuth,
  JobSeekerController.addExperienceToJobSeeker
);

router.post(
  "/experiencess",
  passport.checkAuth,
  JobSeekerController.getExperiencesByJobSeekerUserId
);

router.post(
  "/experienceId",
  passport.checkAuth,
  JobSeekerController.getExperienceByJobSeekerId
);

router.delete(
  "/experience",
  passport.checkAuth,
  JobSeekerController.deleteExperience
);

router.patch(
  "/experience",
  passport.checkAuth,
  JobSeekerController.updateExperience
);

module.exports = router;
