const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");

const { JobSeekerExperienceRepository } = require("../repositories");

const jobSeekerExperienceRepository = new JobSeekerExperienceRepository();
const JobSeekerService = require("./jobseeker-service");

async function addExperienceToJobSeeker(id, data) {
  try {
    const jobSeeker = await JobSeekerService.getJobSeekerByUserId(id);

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

async function getExperiencesByJobSeekerUserId(id) {
  try {
    const jobSeeker = await JobSeekerService.getJobSeekerByUserId(id);

    if (!jobSeeker) {
      throw new AppError(
        "No Job Seeker found for the given user Id",
        { explanation: "" },
        StatusCodes.CONFLICT
      );
    }

    const jobSeekerExperiences =
      await jobSeekerExperienceRepository.getExperiencesByJobSeekerId(
        jobSeeker.id
      );

    if (!jobSeekerExperiences) {
      throw new AppError(
        "The requested experiences not found",
        { explanation: "" },
        StatusCodes.NOT_FOUND
      );
    }

    return jobSeekerExperiences;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      "Something went wrong",
      { explanation: error.message, sql: error.sql },
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getExperienceByJobSeekerId(id) {
  try {
    const jobSeekerExperience =
      await jobSeekerExperienceRepository.getExperienceByJobSeekerId(
        jobSeeker.id
      );

    if (!jobSeekerExperience) {
      throw new AppError(
        "The requested education not found",
        { explanation: "" },
        StatusCodes.NOT_FOUND
      );
    }

    return jobSeekerExperience;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      "Something went wrong",
      { explanation: error.message, sql: error.sql },
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function deleteExperience(id) {
  try {
    const experience = await jobSeekerExperienceRepository.destroy(id);

    if (!experience) {
      throw new AppError(
        "No experience found for the given job seeker Id",
        { explanation: "" },
        StatusCodes.CONFLICT
      );
    }

    return experience;
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

async function updateExperience(id, data) {
  try {
    const experience = await jobSeekerExperienceRepository.update(id, data);
    return experience;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      "Something went wrong",
      { explanation: error.message, query: error.sql || "" },
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  addExperienceToJobSeeker,
  getExperiencesByJobSeekerUserId,
  getExperienceByJobSeekerId,
  deleteExperience,
  updateExperience,
};
