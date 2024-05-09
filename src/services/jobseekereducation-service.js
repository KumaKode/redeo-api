const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");

const { JobSeekerEducationRepository } = require("../repositories");

const jobSeekerEducationRepository = new JobSeekerEducationRepository();
const JobSeekerService = require("./jobseeker-service");

async function addEducationToJobSeeker(id, data) {
  try {
    const jobSeeker = await JobSeekerService.getJobSeekerByUserId(id);

    if (!jobSeeker) {
      throw new AppError(
        "No Job Seeker found for the given user Id",
        { explanation: "" },
        StatusCodes.CONFLICT
      );
    }
    const jobSeekerEducation = await jobSeekerEducationRepository.create({
      jobSeekerId: jobSeeker.id,
      ...data,
    });
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
