const CrudRepository = require("./crud-repository");
const { Country } = require("../models");

class CountryRepository extends CrudRepository {
  constructor() {
    super(Country);
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
