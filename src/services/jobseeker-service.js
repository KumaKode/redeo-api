const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");

const { JobSeekerRepository } = require("../repositories");

const jobSeekerRepository = new JobSeekerRepository();

async function createJobSeeker(data) {
  try {
    const jobSeeker = await jobSeekerRepository.create(data);
    return jobSeeker;
  } catch (error) {
    throw new AppError(
      "Something went wrong",
      { explanation: error.message, query: error.sql || "" },
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getJobSeekerProfileByUserId(id) {
  try {
    const jobSeeker = await jobSeekerRepository.getJobSeekerProfileByUserId(id);

    if (!jobSeeker) {
      throw new AppError(
        "No Job Seeker found for the given user Id",
        { explanation: "" },
        StatusCodes.CONFLICT
      );
    }

    return jobSeeker;
  } catch (error) {
    console.log(error);
    if (error instanceof AppError) throw error;
    throw new AppError(
      "Something went wrong",
      { explanation: error.message, sql: error.sql },
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getJobSeekerByUserId(id) {
  try {
    const jobSeeker = await jobSeekerRepository.getJobSeekerByUserId(id);

    if (!jobSeeker) {
      throw new AppError(
        "No Job Seeker found for the given user Id",
        { explanation: "" },
        StatusCodes.CONFLICT
      );
    }

    return jobSeeker;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      "Something went wrong",
      { explanation: error.message, sql: error.sql },
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createJobSeeker,
  getJobSeekerProfileByUserId,
  getJobSeekerByUserId,
};