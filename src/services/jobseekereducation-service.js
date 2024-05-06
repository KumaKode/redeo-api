const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");

const { JobSeekerEducationRepository } = require("../repositories");

const jobSeekerEducationRepository = new JobSeekerEducationRepository();

async function addEducationToJobSeeker(data) {
  try {
    const jobSeekerEducation = await jobSeekerEducationRepository.create(data);
    return jobSeekerEducation;
  } catch (error) {
    throw new AppError(
      "Something went wrong",
      { explanation: error.message, query: error.sql || "" },
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  addEducationToJobSeeker,
};
