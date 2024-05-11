const CrudRepository = require("./crud-repository");
const { JobSeekerExperience } = require("../models");

class JobSeekerExperienceRepository extends CrudRepository {
  constructor() {
    super(JobSeekerExperience);
  }

  async getExperiencesByJobSeekerId(id) {
    const resume = await JobSeekerExperience.findAll({
      where: {
        jobSeekerId: id,
      },
    });

    return resume;
  }

  async getExperienceByJobSeekerId(id) {
    const resume = await JobSeekerExperience.findOne({
      where: {
        jobSeekerId: id,
      },
    });

    return resume;
  }
}

module.exports = JobSeekerExperienceRepository;
