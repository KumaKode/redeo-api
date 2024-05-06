const CrudRepository = require("./crud-repository");
const { JobSeekerResume } = require("../models");

class JobSeekerResumeRepository extends CrudRepository {
  constructor() {
    super(JobSeekerResume);
  }

  async getResumesByJobSeekerId(id) {
    const resume = await this.model.findAll({
      where: {
        jobSeekerId: id,
      },
    });

    return resume;
  }

  async deleteResume() {}
}

module.exports = JobSeekerResumeRepository;