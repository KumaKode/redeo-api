const express = require("express");
const passport = require("passport");
const { StatusCodes } = require("http-status-codes");
const router = express.Router();

const { UserController } = require("../../controllers");
const { UserMiddlewares } = require("../../middlewares");
const { ErrorResponse, SuccessResponse } = require("../../utils/common");
const upload = require("../../utils/helpers/file-upload");
const AppError = require("../../utils/errors/app-error");
require("../../utils/common/passport");

router.post("/signin/google", UserController.socialSiginin);
router.post("/signin/linkedin", UserController.socialSiginin);

router.post("/signin", UserController.signin);

router.post("/signup", UserMiddlewares.validateSignup, UserController.signup);

router.post("/addType", passport.checkAuth, UserController.addTypeToUser);

router.post("/addSkill", passport.checkAuth, UserController.addSkillToUser);

router.post(
  "/profile-picture",
  passport.checkAuth,
  function (req, res, next) {
    upload.single("image")(req, res, function (error) {
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
  UserController.updateUser
);

//router.get("/:id", UserController.getUser);

router.post("/verify/mail", passport.checkAuth, UserController.verifyEmail);
router.post("/verify/resendOTP", passport.checkAuth, UserController.resendOTP);

router.patch("/", UserController.updateUser);

router.get("/profile", passport.checkAuth, (req, res) => {
  try {
    SuccessResponse.data = req.user;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    console.log(error);
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
});

module.exports = router;
