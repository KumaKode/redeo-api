const { CountryService } = require("../services");
const { StatusCodes } = require("http-status-codes");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

async function getCountries(req, res) {
  try {
    const countries = await CountryService.getCountries();
    SuccessResponse.data = countries;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = error.message;
    ErrorResponse.error = error.explanation;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function getCountry(req, res) {
  try {
    const country = await CountryService.getCountry(req.body.countryId);
    SuccessResponse.data = country;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = error.message;
    ErrorResponse.error = error.explanation;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = {
  getCountries,
  getCountry,
};
