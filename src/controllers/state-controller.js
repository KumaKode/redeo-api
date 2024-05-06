const { StateService } = require("../services");
const { StatusCodes } = require("http-status-codes");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

async function createState(req, res) {
  try {
    const state = await StateService.createState({
      name: req.body.name,
      countryId: req.body.countryId,
    });
    SuccessResponse.data = state;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = error.message;
    ErrorResponse.error = error.explanation;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function getStates(req, res) {
  try {
    const states = await StateService.getStates();
    SuccessResponse.data = states;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = error.message;
    ErrorResponse.error = error.explanation;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function getStatesByCountryCode(req, res) {
  try {
    const state = await StateService.getStatesByCountryCode(
      req.body.countryCode
    );
    SuccessResponse.data = state;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = error.message;
    ErrorResponse.error = error.explanation;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function destroyState(req, res) {
  try {
    const response = await StateService.destroyState(req.params.id);
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = error.message;
    ErrorResponse.error = error.explanation;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function updateState(req, res) {
  try {
    const state = await StateService.updateState(req.params.id, req.body);
    SuccessResponse.data = state;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = error.message;
    ErrorResponse.error = error.explanation;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = {
  createState,
  getStates,
  getStatesByCountryCode,
  destroyState,
  updateState,
};
