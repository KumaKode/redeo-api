const { StatusCodes } = require("http-status-codes");
const { CityRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");

const cityRepository = new CityRepository();
const StateService = require("./state-service");

async function createCity(data) {
  try {
    const city = await cityRepository.create(data);
    return city;
  } catch (error) {
    throw new AppError(
      "Cannot Create a new City Object!",
      { explanation: error.message, query: error.sql || "" },
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getCities() {
  try {
    const cities = await cityRepository.findAll();
    return cities;
  } catch (error) {
    console.log(error);
    throw new AppError(
      "Cannot fetch data of all the Cities",
      { explanation: error.message, query: error.sql || "" },
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getCitiesByCountryAndStateCode(stateId) {
  try {
    const state = await StateService.getState(stateId);

    if (!state) {
      throw new AppError(
        "The requested state not found",
        { explanation: "" },
        StatusCodes.NOT_FOUND
      );
    }

    const cities = await cityRepository.getCitiesByCountryAndStateCode({
      countryCode: state.countryCode,
      stateCode: state.stateCode,
    });

    return cities;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      "Something went wrong",
      { explanation: error.message, query: error.sql || "" },
      StatusCodes.NOT_FOUND
    );
  }
}

async function destroyCity(id) {
  try {
    const response = await cityRepository.destroy(id);

    if (!response) {
      throw new AppError(
        "The requested city not found",
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

async function updateCity(id, data) {
  try {
    const city = await cityRepository.update(id, data);

    if (!city) {
      throw new AppError(
        "The requested city not found",
        { explanation: "" },
        StatusCodes.NOT_FOUND
      );
    }

    return city;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      "something went wrong",
      { explanation: error.message, query: error.sql || "" },
      StatusCodes.NOT_FOUND
    );
  }
}

module.exports = {
  createCity,
  getCities,
  getCitiesByCountryAndStateCode,
  destroyCity,
  updateCity,
};
