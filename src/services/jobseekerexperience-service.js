const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");

const { JobSeekerExperienceRepository } = require("../repositories");

const jobSeekerExperienceRepository = new JobSeekerExperienceRepository();

async function addExperienceToJobSeeker(data) {
  try {
    const jobSeekerExperience = await jobSeekerExperienceRepository.create(
      data
    );
    return jobSeekerExperience;
  } catch (error) {
    throw new AppError(
      "Something went wrong",
      { explanation: error.message, query: error.sql || "" },
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  addExperienceToJobSeeker,
};
