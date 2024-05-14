const { StatusCodes } = require("http-status-codes");
const { SuccessResponse, ErrorResponse } = require("../utils/common");
const moment = require("moment");

const { EmployerSerevice } = require("../services");

async function createEmployer(req, res) {
  try {
    const employer = await EmployerSerevice.createEmployer({
      userId: req.user.id,
      companyName: req.body.companyName,
      companyDescription: req.body.companyDescription,
      companyLogo: req.body.companyLogo,
      companyWebsite: req.body.companyWebsite,
      gender: req.body.gender,
      dob: req.body.dob,
      age: moment().diff(req.body.dob, "years"),
      phone: req.body.phone,
      countryId: req.body.countryId,
      stateId: req.body.stateId,
      cityId: req.body.cityId,
      companyAddress: req.body.companyAddress,
      employees: req.body.employees,
    });
    SuccessResponse.data = employer;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = error.message;
    ErrorResponse.error = error.explanation;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function getEmployerProfileByUserId(req, res) {
  try {
    const jobSeekerProfile = await EmployerSerevice.getEmployerProfileByUserId(
      req.user.id
    );
    SuccessResponse.data = jobSeekerProfile[0];
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = error.message;
    ErrorResponse.error = error.explanation;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function updateEmployerProfile(req, res) {
  try {
    const employer = await EmployerSerevice.updateEmployerProfile(req.body.id, {
      userId: req.user.id,
      companyName: req.body.companyName,
      companyDescription: req.body.companyDescription,
      companyLogo: req.body.companyLogo,
      companyWebsite: req.body.companyWebsite,
      gender: req.body.gender,
      dob: req.body.dob,
      age: moment().diff(req.body.dob, "years"),
      phone: req.body.phone,
      countryId: req.body.countryId,
      stateId: req.body.stateId,
      cityId: req.body.cityId,
      companyAddress: req.body.companyAddress,
      employees: req.body.employees,
    });
    SuccessResponse.data = employer;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = error.message;
    ErrorResponse.error = error.explanation;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function getAllEmployers(req, res) {
  try {
    const employers = await EmployerSerevice.getAllEmployers();
    SuccessResponse.data = employers;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = error.message;
    ErrorResponse.error = error.explanation;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = {
  createEmployer,
  getEmployerProfileByUserId,
  updateEmployerProfile,
  getAllEmployers,
};
