const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");

const { JobRepository } = require("../repositories");

const jobRepository = new JobRepository();
const JobSeekerService = require("./jobseeker-service");
const jobSeekerResumeService = require("./jobseekerresume-service");
const VideoService = require("./video-service");

async function postJob(data) {
  try {
    const job = await jobRepository.create(data);
    return job;
  } catch (error) {
    throw new AppError(
      "Something went wrong",
      { explanation: error.message, query: error.sql || "" },
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function applyJob(jobId, jobSeekerId, resumeId, videoId) {
  try {
    const job = await jobRepository.get(jobId);

    if (!job) {
      throw new AppError(
        "No Job found for the given id",
        { explanation: "" },
        StatusCodes.NOT_FOUND
      );
    }

    const jobSeeker = await JobSeekerService.getJobSeeker(jobSeekerId);

    if (!jobSeeker) {
      throw new AppError(
        "No Job Seeker found for the given id",
        { explanation: "" },
        StatusCodes.NOT_FOUND
      );
    }

    const resume = await jobSeekerResumeService.getResume(resumeId);

    if (!resume) {
      throw new AppError(
        "No resume found for the given id",
        { explanation: "" },
        StatusCodes.NOT_FOUND
      );
    }

    const video = await VideoService.getVideo(videoId);

    if (!video) {
      throw new AppError(
        "No resume found for the given id",
        { explanation: "" },
        StatusCodes.NOT_FOUND
      );
    }

    job.addJobSeeker(jobSeeker);
    job.addResume(resume);
    job.addVideo(video);

    return true;
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
  postJob,
  applyJob,
};
