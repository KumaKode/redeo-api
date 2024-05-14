const CrudRepository = require("./crud-repository");
const { Job } = require("../models");

class JobRepository extends CrudRepository {
  constructor() {
    super(Job);
  }
}

module.exports = JobRepository;
