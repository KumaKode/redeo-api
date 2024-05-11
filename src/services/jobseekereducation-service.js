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

async function getEducationsByJobSeekerUserId(id) {
  try {
    const jobSeeker = await JobSeekerService.getJobSeekerByUserId(id);

    if (!jobSeeker) {
      throw new AppError(
        "No Job Seeker found for the given user Id",
        { explanation: "" },
        StatusCodes.CONFLICT
      );
    }

    const jobSeekerEducations =
      await jobSeekerEducationRepository.getEducationsByJobSeekerId(
        jobSeeker.id
      );

    if (!jobSeekerEducations) {
      throw new AppError(
        "The requested educations not found",
        { explanation: "" },
        StatusCodes.NOT_FOUND
      );
    }

    return jobSeekerEducations;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      "Something went wrong",
      { explanation: error.message, sql: error.sql },
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getEducationByJobSeekerId(id) {
  try {
    const jobSeekerEducation =
      await jobSeekerEducationRepository.getEducationByJobSeekerId(
        jobSeeker.id
      );

    if (!jobSeekerEducation) {
      throw new AppError(
        "The requested education not found",
        { explanation: "" },
        StatusCodes.NOT_FOUND
      );
    }

    return jobSeekerEducation;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      "Something went wrong",
      { explanation: error.message, sql: error.sql },
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function deleteEducation(id) {
  try {
    const education = await jobSeekerEducationRepository.destroy(id);

    if (!education) {
      throw new AppError(
        "No education found for the given job seeker Id",
        { explanation: "" },
        StatusCodes.CONFLICT
      );
    }

    return education;
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

async function updateEducation(id, data) {
  try {
    const education = await jobSeekerEducationRepository.update(id, data);
    return education;
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
  addEducationToJobSeeker,
  getEducationsByJobSeekerUserId,
  getEducationByJobSeekerId,
  deleteEducation,
  updateEducation,
};
