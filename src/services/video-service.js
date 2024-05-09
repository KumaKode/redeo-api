const fs = require("fs");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");

const { VideoRepository } = require("../repositories");

const videoRepository = new VideoRepository();
const JobSeekerService = require("./jobseeker-service");

async function addVideoToJobSeeker(id, data) {
  try {
    const jobSeeker = await JobSeekerService.getJobSeekerByUserId(id);

    if (!jobSeeker) {
      throw new AppError(
        "No Job Seeker found for the given user Id",
        { explanation: "" },
        StatusCodes.CONFLICT
      );
    }
    const jobSeekerVideo = await videoRepository.create({
      jobSeekerId: jobSeeker.id,
      ...data,
    });

    return jobSeekerVideo;
  } catch (error) {
    throw new AppError(
      "Something went wrong",
      { explanation: error.message, query: error.sql || "" },
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getVideosByJobSeekerUserId(id) {
  try {
    const jobSeeker = await JobSeekerService.getJobSeekerByUserId(id);

    if (!jobSeeker) {
      throw new AppError(
        "No Job Seeker found for the given user Id",
        { explanation: "" },
        StatusCodes.CONFLICT
      );
    }

    const jobSeekerVideos = await videoRepository.getVideosByJobSeekerId(
      jobSeeker.id
    );

    if (!jobSeekerVideos) {
      throw new AppError(
        "No Videos found for the given job seeker",
        { explanation: "" },
        StatusCodes.CONFLICT
      );
    }

    return jobSeekerVideos;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      "Something went wrong",
      { explanation: error.message, sql: error.sql },
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function deleteVideo(id) {
  try {
    const data = await videoRepository.get(id);

    if (!data) {
      throw new AppError(
        "No video found for the given job seeker",
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

    const video = await videoRepository.destroy(id);

    if (!video) {
      throw new AppError(
        "No video found for the given job seeker Id",
        { explanation: "" },
        StatusCodes.CONFLICT
      );
    }

    return video;
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
  addVideoToJobSeeker,
  getVideosByJobSeekerUserId,
  deleteVideo,
};
