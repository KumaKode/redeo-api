const { StatusCodes } = require("http-status-codes");
const { CountryRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");

const countryRepository = new CountryRepository();

async function getCountries() {
  try {
    const countries = await countryRepository.findAll();
    return countries;
  } catch (error) {
    throw new AppError(
      "Cannot fetch data of all the Countries",
      { explanation: error.message, query: error.sql || "" },
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getCountryByCode(code) {
  try {
    const country = await countryRepository.getCountryByCode(code);
    if (!country) {
      throw new AppError(
        "The requested country not found",
        { explanation: "" },
        StatusCodes.NOT_FOUND
      );
    }
    return country;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      "Something went wrong",
      { explanation: error.message, query: error.sql || "" },
      StatusCodes.NOT_FOUND
    );
  }
}

async function getCountryByName(name) {
  try {
    const country = await countryRepository.getCountryByName(name);
    if (!country) {
      throw new AppError(
        "The requested country not found",
        { explanation: "" },
        StatusCodes.NOT_FOUND
      );
    }
    return country;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      "Something went wrong",
      { explanation: error.message, query: error.sql || "" },
      StatusCodes.NOT_FOUND
    );
  }
}

module.exports = {
  getCountries,
  getCountryByCode,
  getCountryByName,
};
