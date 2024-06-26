const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");

const { JobSeekerRepository } = require("../repositories");

const jobSeekerRepository = new JobSeekerRepository();
const UserService = require("./user-service");

async function createJobSeeker(data) {
  try {
    const update = await UserService.updateUser(data.userId, {
      dob: data.dob,
      gender: data.gender,
      age: data.age,
    });

    const jobSeeker = await jobSeekerRepository.create(data);
    return [jobSeeker, update];
  } catch (error) {
    throw new AppError(
      "Something went wrong",
      { explanation: error.message, query: error.sql || "" },
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAllJobSeekers() {
  try {
    const jobSeekers = await jobSeekerRepository.findAll();

    if (!jobSeekers) {
      throw new AppError(
        "No Job Seekers found",
        { explanation: "" },
        StatusCodes.CONFLICT
      );
    }

    return jobSeekers;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      "Something went wrong",
      { explanation: error.message, sql: error.sql },
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function updateJobSeekerProfile(id, data) {
  try {
    const update = await UserService.updateUser(data.userId, {
      dob: data.dob,
      gender: data.gender,
      age: data.age,
    });

    const profile = await jobSeekerRepository.update(id, data);

    if (!profile) {
      throw new AppError(
        "The requested job seeker profile not found",
        { explanation: "" },
        StatusCodes.NOT_FOUND
      );
    }

    return [profile, update];
  } catch (error) {
    if (error instanceof AppError) throw error;
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

async function getJobSeeker(id) {
  try {
    const jobSeeker = await jobSeekerRepository.get(id);

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
  updateJobSeekerProfile,
  getAllJobSeekers,
  getJobSeekerByUserId,
  getJobSeeker,
};
