const CrudRepository = require("./crud-repository");
const { State } = require("../models");
const AppError = require("../utils/errors/app-error");

class StateRepository extends CrudRepository {
  constructor() {
    super(State);
  }

  async getStatesByCountryCode(countryCode) {
    try {
      const response = await State.findAll({
        where: {
          countryCode: countryCode,
        },
      });
      return response;
    } catch (error) {
      throw new AppError(
        "The requested states not found",
        { explanation: error.sqlMessage },
        StatusCodes.NOT_FOUND
      );
    }
  }
}

module.exports = StateRepository;
