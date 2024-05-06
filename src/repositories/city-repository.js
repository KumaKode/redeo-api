const { StatusCodes } = require("http-status-codes");
const CrudRepository = require("./crud-repository");
const { City } = require("../models");
const AppError = require("../utils/errors/app-error");

class CityRepository extends CrudRepository {
  constructor() {
    super(City);
  }

  async getCitiesByCountryAndStateCode(data) {
    try {
      const response = await City.findAll({
        where: {
          countryCode: data.countryCode,
          stateCode: data.stateCode,
        },
      });
      return response;
    } catch (error) {
      throw new AppError(
        "The requested cities not found",
        { explanation: error.message, sql: error.sql },
        StatusCodes.NOT_FOUND
      );
    }
  }
}

module.exports = CityRepository;
