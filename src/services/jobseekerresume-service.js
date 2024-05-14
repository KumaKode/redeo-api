const fs = require("fs");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");

const { JobSeekerResumeRepository } = require("../repositories");

const jobSeekerResumeRepository = new JobSeekerResumeRepository();
const JobSeekerService = require("./jobseeker-service");

async function addResumeToJobSeeker(id, data) {
  try {
    const jobSeeker = await JobSeekerService.getJobSeekerByUserId(id);

    if (!jobSeeker) {
      throw new AppError(
        "No Job Seeker found for the given user Id",
        { explanation: "" },
        StatusCodes.CONFLICT
      );
    }
    const jobSeekerResume = await jobSeekerResumeRepository.create({
      jobSeekerId: jobSeeker.id,
      ...data,
    });
    return jobSeekerResume;
  } catch (error) {
    throw new AppError(
      "Something went wrong",
      { explanation: error.message, query: error.sql || "" },
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getResume(id) {
  try {
    const jobSeekerResume = await jobSeekerResumeRepository.get(id);

    if (!jobSeekerResume) {
      throw new AppError(
        "No resume found for the given Id",
        { explanation: "" },
        StatusCodes.CONFLICT
      );
    }

    return jobSeekerResume;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      "Something went wrong",
      { explanation: error.message, sql: error.sql },
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getResumesByJobSeekerUserId(id) {
  try {
    const jobSeeker = await JobSeekerService.getJobSeekerByUserId(id);

    if (!jobSeeker) {
      throw new AppError(
        "No Job Seeker found for the given user Id",
        { explanation: "" },
        StatusCodes.CONFLICT
      );
    }

    const jobSeekerResumes =
      await jobSeekerResumeRepository.getResumesByJobSeekerId(jobSeeker.id);

    if (!jobSeekerResumes) {
      throw new AppError(
        "The requested resumes not found",
        { explanation: "" },
        StatusCodes.NOT_FOUND
      );
    }

    return jobSeekerResumes;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      "Something went wrong",
      { explanation: error.message, sql: error.sql },
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function deleteResume(id) {
  try {
    const data = await jobSeekerResumeRepository.get(id);

    if (!data) {
      throw new AppError(
        "No resume found for the given job seeker Id",
        { explanation: "" },
        StatusCodes.CONFLICT
      );
    }

    const filePathToRemove = String.raw`${data.path}`;

    fs.unlink(filePathToRemove, (error) => {
      if (error) {
        throw new AppError(
          "Error Removing File",
          { explanation: error.message },
          StatusCodes.CONFLICT
        );
      }
    });

    const resume = await jobSeekerResumeRepository.destroy(id);

    if (!resume) {
      throw new AppError(
        "No resume found for the given job seeker Id",
        { explanation: "" },
        StatusCodes.CONFLICT
      );
    }

    return resume;
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

module.exports = {
  addResumeToJobSeeker,
  getResume,
  getResumesByJobSeekerUserId,
  deleteResume,
};
