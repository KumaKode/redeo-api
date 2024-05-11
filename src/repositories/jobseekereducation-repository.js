const CrudRepository = require("./crud-repository");
const { JobSeekerEducation } = require("../models");

class JobSeekerEducationRepository extends CrudRepository {
  constructor() {
    super(JobSeekerEducation);
  }

  async getEducationsByJobSeekerId(id) {
    const resume = await JobSeekerEducation.findAll({
      where: {
        jobSeekerId: id,
      },
    });

    return resume;
  }

  async getEducationByJobSeekerId(id) {
    const resume = await JobSeekerEducation.findOne({
      where: {
        jobSeekerId: id,
      },
    });

    return resume;
  }
}

module.exports = JobSeekerEducationRepository;
