const { JobService } = require("../services");
const { StatusCodes } = require("http-status-codes");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

async function postJob(req, res) {
  try {
    const job = await JobService.postJob({
      employerId: req.body.employerId,
      jobTitle: req.body.jobTitle,
      categoryId: req.body.categoryId,
      workPlace: req.body.workPlace,
      jobType: req.body.jobType,
      skills: req.body.skills,
      jobDescription: req.body.jobDescription,
      jobLocation: req.body.jobLocation,
      experience: req.body.experience,
      salary: req.body.salary,
    });
    SuccessResponse.data = job;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = error.message;
    ErrorResponse.error = error.explanation;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function applyJob(req, res) {
  try {
    const job = await JobService.applyJob(
      req.body.jobId,
      req.body.jobSeekerId,
      req.body.resumeId,
      req.body.videoId
    );
    SuccessResponse.data = job;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = error.message;
    ErrorResponse.error = error.explanation;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = {
  postJob,
  applyJob,
};
