const CrudRepository = require("./crud-repository");
const { State } = require("../models");
const AppError = require("../utils/errors/app-error");

class StateRepository extends CrudRepository {
  constructor() {
    super(State);
  }

  async getStatesByCountryCode(countryCode) {
    const response = await State.findAll({
      where: {
        countryCode: countryCode,
      },
    });
    return response;
  }

  async getStateByName(name) {
    const response = await State.findOne({
      where: {
        name: name,
      },
    });
    return response;
  }

  async getStateByNameAndCountryCode(name, countryCode) {
    const response = await State.findOne({
      where: {
        name: name,
        countryCode: countryCode,
      },
    });
    return response;
  }
}

module.exports = StateRepository;
