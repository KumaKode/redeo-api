const CrudRepository = require("./crud-repository");
const { Sequelize, where } = require("sequelize");
const {
  User,
  JobSeeker,
  JobSeekerEducation,
  JobSeekerExperience,
  Country,
  State,
  City,
  Skill,
} = require("../models");

class JobSeekerRepository extends CrudRepository {
  constructor() {
    super(JobSeeker);
  }

  async getJobSeekerProfileByUserId(id) {
    const response = await this.model.findAll({
      where: {
        userId: id,
      },
      include: [
        {
          model: User,
          required: true,
        },
        {
          model: JobSeekerEducation,
          as: "education",
          require: true,
        },
        {
          model: JobSeekerExperience,
          required: true,
          as: "experience",
        },
        {
          model: Skill,
        },
        {
          model: Country,
          required: true,
        },
        {
          model: State,
          required: true,
        },
        {
          model: City,
          required: true,
        },
      ],
    });

    return response;
  }

  async getJobSeekerByUserId(id) {
    const response = await this.model.findOne({
      where: {
        userId: id,
      },
    });

    return response;
  }
}

module.exports = JobSeekerRepository;
