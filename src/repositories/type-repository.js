const { StatusCodes } = require("http-status-codes");
const CrudRepository = require("./crud-repository");
const { Type } = require("../models");
const AppError = require("../utils/errors/app-error");

class TypeRepository extends CrudRepository {
  constructor() {
    super(Type);
  }

  async getTypeByName(name) {
    try {
      const response = await Type.findOne({ where: { name: name } });
      return response;
    } catch (error) {
      throw new AppError(
        "The requested type not found",
        { explanation: error.message, query: error.sql || "" },
        StatusCodes.NOT_FOUND
      );
    }
  }
}

module.exports = TypeRepository;
