const { StatusCodes } = require("http-status-codes");
const { StateRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");

const stateRepository = new StateRepository();
const CountryService = require("./country-service");

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

async function getState(id) {
  try {
    const state = await stateRepository.get(id);

    if (!state) {
      throw new AppError(
        "No state found for the given Id",
        { explanation: "" },
        StatusCodes.CONFLICT
      );
    }

    return state;
  } catch (error) {
    if (error instanceof AppError) throw error;
    if ((error.StatusCode = StatusCodes.NOT_FOUND)) {
      throw new AppError("The requested state not found", error.StatusCode);
    }
  }
}

async function getStatesByCountryId(id) {
  try {
    const country = await CountryService.getCountry(id);

    if (!country) {
      throw new AppError(
        "The requested country not found",
        { explanation: "" },
        StatusCodes.NOT_FOUND
      );
    }

    const state = await stateRepository.getStatesByCountryCode(
      country.countryCode
    );

    if (!state) {
      throw new AppError(
        "The requested state not found",
        { explanation: "" },
        StatusCodes.NOT_FOUND
      );
    }
    return state;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      "something went wrong",
      { explanation: error.message, query: error.sql || "" },
      StatusCodes.NOT_FOUND
    );
  }
}

async function destroyState(id) {
  try {
    const response = await stateRepository.destroy(id);

    if (!response) {
      throw new AppError(
        "The requested state not found",
        { explanation: "" },
        StatusCodes.NOT_FOUND
      );
    }

    return response;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      "something went wrong",
      { explanation: error.message, query: error.sql || "" },
      StatusCodes.NOT_FOUND
    );
  }
}

async function updateState(id, data) {
  try {
    const state = await stateRepository.update(id, data);

    if (!state) {
      throw new AppError(
        "The requested state not found",
        { explanation: "" },
        StatusCodes.NOT_FOUND
      );
    }

    return state;
  } catch (error) {
    if (error instanceof AppError) throw error;
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
  getStatesByCountryId,
  getState,
  destroyState,
  updateState,
};
