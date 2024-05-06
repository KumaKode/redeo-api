const CrudRepository = require("./crud-repository");
const { JobSeekerExperience } = require("../models");

class JobSeekerExperienceRepository extends CrudRepository {
  constructor() {
    super(JobSeekerExperience);
  }
}

module.exports = JobSeekerExperienceRepository;
