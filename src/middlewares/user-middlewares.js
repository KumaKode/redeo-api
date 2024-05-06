const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const { UserService } = require("../services");
const AppError = require("../utils/errors/app-error");
const moment = require("moment");
//const { UserService } = require("../services");

function validateSignin(req, res, next) {
  if (!/\S+@\S+\.\S+/.test(req.body.email)) {
    ErrorResponse.message = "Something went wrong while sign in the user";
    ErrorResponse.error = new AppError(
      "Invalid email address!",
      { explanation: "" },
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.password) {
    ErrorResponse.message = "Something went wrong while sign in the user";
    ErrorResponse.error = new AppError(
      "password not found in the incoming request",
      { explanation: "" },
      StatusCodes.BAD_REQUEST
    );
  }
  next();
}

function validateSignup(req, res, next) {
  if (!/^[a-zA-Z\s]+$/.test(req.body.name)) {
    ErrorResponse.message = "Something went wrong while creating the user";
    ErrorResponse.error = new AppError(
      "Name should only contain alphabets!",
      { explanation: "" },
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!/\S+@\S+\.\S+/.test(req.body.email)) {
    ErrorResponse.message = "Something went wrong while creating the user";
    ErrorResponse.error = new AppError(
      "Invalid email address!",
      { explanation: "" },
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (req.body.password.length < 8 || req.body.password.length > 16) {
    ErrorResponse.message = "Something went wrong while creating the user";
    ErrorResponse.error = new AppError(
      "Password should be minimum 8 characters long!",
      { explanation: "" },
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  next();
}

function validateDOB(req, res, next) {
  const age = moment().diff(req.body.dob, "years");
  if (age < 16) {
    ErrorResponse.message = "You must be at least 16 years old";
    ErrorResponse.error = { explanation: "" };
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  next();
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
  validateDOB,
};
