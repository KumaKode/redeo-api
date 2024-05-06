const { StatusCodes } = require("http-status-codes");
const { CityRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");

const cityRepository = new CityRepository();

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

async function getCitiesByCountryAndStateCode(data) {
  try {
    const cities = await cityRepository.getCitiesByCountryAndStateCode(data);
    return cities;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      "Requested cities not found",
      { explanation: error.message, query: error.sql || "" },
      StatusCodes.NOT_FOUND
    );
  }
}

async function destroyCity(id) {
  try {
    const response = await cityRepository.destroy(id);
    return response;
  } catch (error) {
    if ((error.StatusCode = StatusCodes.NOT_FOUND)) {
      throw new AppError("The requested city not found", "", error.StatusCode);
    }
    throw new AppError(
      "Something went wrong",
      { explanation: error.message, query: error.sql || "" },
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function updateCity(id, data) {
  try {
    const city = await cityRepository.update(id, data);
    return city;
  } catch (error) {
    console.log(error);
    if ((error.StatusCode = StatusCodes.NOT_FOUND)) {
      throw new AppError("The requested city not found", error.StatusCode);
    }
    throw new AppError(
      "Something went wrong",
      { explanation: error.message, query: error.sql || "" },
      StatusCodes.INTERNAL_SERVER_ERROR
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
