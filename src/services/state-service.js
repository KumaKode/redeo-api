const { StatusCodes } = require("http-status-codes");
const { StateRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");

const stateRepository = new StateRepository();

async function createState(data) {
  try {
    const state = await stateRepository.create(data);
    return state;
  } catch (error) {
    throw new AppError(
      "Cannot Create a new State Object!",
      { explanation: error.message, query: error.sql || "" },
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getStates() {
  try {
    const states = await stateRepository.findAll();
    return states;
  } catch (error) {
    throw new AppError(
      "Cannot fetch data of all the States",
      { explanation: error.message, query: error.sql || "" },
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getStatesByCountryCode(countryCode) {
  try {
    const state = await stateRepository.getStatesByCountryCode(countryCode);
    return state;
  } catch (error) {
    console.log(error);
    throw new AppError(
      "The requested states not found",
      { explanation: error.message, query: error.sql || "" },
      StatusCodes.NOT_FOUND
    );
  }
}

async function destroyState(id) {
  try {
    const response = await stateRepository.destroy(id);
    return response;
  } catch (error) {
    if ((error.StatusCode = StatusCodes.NOT_FOUND)) {
      throw new AppError(
        "The requested state not found",
        { explanation: "" },
        error.StatusCode
      );
    }
    throw new AppError(
      "Something went wrong!",
      { explanation: error.message, query: error.sql || "" },
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function updateState(id, data) {
  try {
    const state = await stateRepository.update(id, data);
    return state;
  } catch (error) {
    if ((error.StatusCode = StatusCodes.NOT_FOUND)) {
      throw new AppError("The requested state not found", "", error.StatusCode);
    }
    throw new AppError(
      "Something went wrong!",
      { explanation: error.message, query: error.sql || "" },
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createState,
  getStates,
  getStatesByCountryCode,
  destroyState,
  updateState,
};