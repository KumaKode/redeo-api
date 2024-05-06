const CrudRepository = require("./crud-repository");
const { JobSeekerEducation } = require("../models");

class JobSeekerEducationRepository extends CrudRepository {
  constructor() {
    super(JobSeekerEducation);
  }
}

module.exports = JobSeekerEducationRepository;
