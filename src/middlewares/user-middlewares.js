const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const { UserService } = require("../services");

function validateSignin(req, res, next) {
  if (!/\S+@\S+\.\S+/.test(req.body.email)) {
    ErrorResponse.message = "Invalid email address!";
    ErrorResponse.error.explanation = "";
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.password) {
    ErrorResponse.message = "Password is required!";
    ErrorResponse.error = { explanation: "" };
  }
  next();
}

function validateSignup(req, res, next) {
  if (!/^[a-zA-Z\s]+$/.test(req.body.name)) {
    ErrorResponse.message = "Name should only contain alphabets!";
    ErrorResponse.error = { explanation: "" };
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!/\S+@\S+\.\S+/.test(req.body.email)) {
    ErrorResponse.message = "Invalid email address!";
    ErrorResponse.error = { explanation: "" };
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (req.body.password.length < 8 || req.body.password.length > 16) {
    ErrorResponse.message = "Password should be minimum 8 characters long!";
    ErrorResponse.error = { explanation: "" };
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  next();
}

async function isAdmin(req, res, next) {
  try {
    const response = await UserService.isAdmin(req.user.id);

    if (!response) {
      ErrorResponse.error = new AppError(
        ["User is not authorized for this action"],
        StatusCodes.UNAUTHORIZED
      );
      return res.status(StatusCodes.UNAUTHORIZED).json(ErrorResponse);
    }

    next();
  } catch (error) {
    console.log(error);
  }
}

async function isEmployerOrJobSeeker(req, res, next) {
  try {
    const employer = await UserService.isEmployer(req.user.id);
    const jobSeeker = await UserService.isJobSeeker(req.user.id);

    if (!employer && !jobSeeker) {
      ErrorResponse.message = "user has no role";
      ErrorResponse.error = { type: false };
      return res.status(StatusCodes.UNAUTHORIZED).json(ErrorResponse);
    }

    next();
  } catch (error) {
    console.log(error);
  }
}

// async function chekAuth(req, res, next) {
//   console.log(req.headers["x-access-token"]);
//   try {
//     const response = await UserService.isAuthenticated(
//       req.headers["x-access-token"]
//     );
//     console.log(response);
//     if (response) {
//       req.user = response;
//       next();
//     }
//   } catch (error) {
//     return res.status(error.statusCode).json(error);
//   }
// }

module.exports = {
  validateSignin,
  validateSignup,
  // chekAuth,
  isEmployerOrJobSeeker,
  isAdmin,
};
