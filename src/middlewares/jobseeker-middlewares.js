const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");

function validateCreateJobSeeker(req, res, next) {
  if (!req.body.occupation) {
    ErrorResponse.message = "Occupation is required!";
    ErrorResponse.error = { explanation: "" };
  }

  if (!/^[a-zA-Z\s]+$/.test(req.body.occupation)) {
    ErrorResponse.message = "Occupation should only contain alphabets!";
    ErrorResponse.error = { explanation: "" };
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.phone) {
    ErrorResponse.message = "Phone is required!";
    ErrorResponse.error = { explanation: "" };
  }

  if (!/^[0-9]+$/.test(req.body.phone)) {
    ErrorResponse.message = "Phone should only contain numbers!";
    ErrorResponse.error = { explanation: "" };
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.description) {
    ErrorResponse.message = "Write a short description about yourself!";
    ErrorResponse.error = { explanation: "" };
  }

  if (!req.body.totalExp) {
    ErrorResponse.message = "Please mention your total experience of work!";
    ErrorResponse.error = { explanation: "" };
  }
  next();
}

module.exports = { validateCreateJobSeeker };
