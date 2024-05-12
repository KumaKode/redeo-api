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
      attributes: [
        "id",
        "userId",
        "occupation",
        "phone",
        "description",
        "totalExp",
      ],
      include: [
        {
          model: User,
          required: true,
          attributes: [
            "id",
            "fullName",
            "dob",
            "age",
            "gender",
            "profilePicture",
          ],
        },
        {
          model: JobSeekerEducation,
          as: "education",
          attributes: [
            "id",
            "jobSeekerId",
            "institute",
            "start",
            "end",
            "degree",
            "description",
          ],
        },
        {
          model: JobSeekerExperience,
          as: "experience",
          attributes: [
            "id",
            "jobSeekerId",
            "company",
            "start",
            "end",
            "role",
            "description",
          ],
        },
        {
          model: Skill,
        },
        {
          model: Country,
          required: true,
          attributes: ["name"],
        },
        {
          model: State,
          required: true,
          attributes: ["name"],
        },
        {
          model: City,
          required: true,
          attributes: ["name"],
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
