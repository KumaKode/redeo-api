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

async function getCountry(id) {
  try {
    const country = await countryRepository.get(id);

    if (!country) {
      throw new AppError(
        "No country found for the given Id",
        { explanation: "" },
        StatusCodes.CONFLICT
      );
    }
    return country;
  } catch (error) {
    if ((error.StatusCode = StatusCodes.NOT_FOUND)) {
      throw new AppError("The requested country not found", error.StatusCode);
    }
  }
}

module.exports = {
  getCountries,
  getCountry,
};
