const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");

const { JobSeekerExperienceRepository } = require("../repositories");

const jobSeekerExperienceRepository = new JobSeekerExperienceRepository();
const JobSeekerService = require("./jobseeker-service");

async function addExperienceToJobSeeker(id, data) {
  try {
    const jobSeeker = await JobSeekerService.getJobSeekerByUserId();

    if (!jobSeeker) {
      throw new AppError(
        "No Job Seeker found for the given user Id",
        { explanation: "" },
        StatusCodes.CONFLICT
      );
    }

    const jobSeekerExperience = await jobSeekerExperienceRepository.create({
      jobSeekerId: jobSeeker.id,
      ...data,
    });

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
