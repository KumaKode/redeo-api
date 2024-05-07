const CrudRepository = require("./crud-repository");
const { Country } = require("../models");

class CountryRepository extends CrudRepository {
  constructor() {
    super(Country);
  }

  async getCountryByCode(code) {
    const response = await Country.findOne({
      where: {
        countryCode: code,
      },
    });
    return response;
  }

  async getCountryByName(name) {
    const response = await Country.findOne({
      where: {
        name: name,
      },
    });
    return response;
  }
}

module.exports = CountryRepository;
