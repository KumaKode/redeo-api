const { StatusCodes } = require("http-status-codes");
const { SuccessResponse, ErrorResponse } = require("../utils/common");
const moment = require("moment");

const {
  JobSeekerService,
  JobSeekerEducationService,
  JobSeekerExperienceService,
  JobSeekerResumeService,
  VideoService,
} = require("../services");

async function createJobSeeker(req, res) {
  try {
    const jobseeker = await JobSeekerService.createJobSeeker({
      userId: req.user.id,
      occupation: req.body.occupation,
      phone: req.body.phone,
      gender: req.body.gender,
      dob: req.body.dob,
      age: moment().diff(req.body.dob, "years"),
      description: req.body.description,
      countryId: req.body.countryId,
      stateId: req.body.stateId,
      cityId: req.body.cityId,
      totalExp: req.body.totalExp,
    });
    SuccessResponse.data = jobseeker;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = error.message;
    ErrorResponse.error = error.explanation;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function getJobSeekerProfileByUserId(req, res) {
  try {
    const jobSeekerProfile = await JobSeekerService.getJobSeekerProfileByUserId(
      req.body.userId
    );
    SuccessResponse.data = jobSeekerProfile;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = error.message;
    ErrorResponse.error = error.explanation;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function addEducationToJobSeeker(req, res) {
  try {
    const jobSeekerEducation =
      await JobSeekerEducationService.addEducationToJobSeeker({
        jobSeekerId: req.body.jobSeekerId,
        institute: req.body.institute,
        start: req.body.start,
        end: req.body.end,
        degree: req.body.degree,
        description: req.body.description,
      });
    SuccessResponse.data = jobSeekerEducation;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = error.message;
    ErrorResponse.error = error.explanation;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function addExperienceToJobSeeker(req, res) {
  try {
    const jobSeekerExperience =
      await JobSeekerExperienceService.addExperienceToJobSeeker({
        jobSeekerId: req.body.jobSeekerId,
        company: req.body.company,
        start: req.body.start,
        end: req.body.end,
        role: req.body.role,
        description: req.body.description,
      });
    SuccessResponse.data = jobSeekerExperience;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = error.message;
    ErrorResponse.error = error.explanation;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function addResumeToJobSeeker(req, res) {
  try {
    const jobSeekerResume = await JobSeekerResumeService.addResumeToJobSeeker(
      req.user.id,
      {
        name: req.file.filename,
        path: req.file.path,
      }
    );
    SuccessResponse.data = jobSeekerResume;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = error.message;
    ErrorResponse.error = error.explanation;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function getResumesByJobSeekerUserId(req, res) {
  try {
    const jobSeekerResumes =
      await JobSeekerResumeService.getResumesByJobSeekerUserId(req.user.id);
    SuccessResponse.data = jobSeekerResumes;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = error.message;
    ErrorResponse.error = error.explanation;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function deleteResume(req, res) {
  try {
    const response = await JobSeekerResumeService.deleteResume(req.body.id);
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = error.message;
    ErrorResponse.error = error.explanation;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function addVideoToJobSeeker(req, res) {
  try {
    const jobSeekerVideo = VideoService.addVideoToJobSeeker(req.user.id, {
      name: req.file.filename,
      path: req.file.path,
    });
    SuccessResponse.data = jobSeekerVideo;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = error.message;
    ErrorResponse.error = error.explanation;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function getVideosByJobSeekerUserId(req, res) {
  try {
    const jobSeekerVideos = await VideoService.getVideosByJobSeekerUserId(
      req.user.id
    );
    SuccessResponse.data = jobSeekerVideos;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = error.message;
    ErrorResponse.error = error.explanation;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function deleteVideo(req, res) {
  try {
    const response = await VideoService.deleteResume(req.body.id);
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = error.message;
    ErrorResponse.error = error.explanation;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

// async function updateCity(req, res) {
//   try {
//     const city = await JobSeekerService.updateCity(req.params.id, req.body);
//     SuccessResponse.data = city;
//     return res.status(StatusCodes.OK).json(SuccessResponse);
//   } catch (error) {
//     ErrorResponse.message = error.message;
//     ErrorResponse.error = error.explanation;
//     return res.status(error.statusCode).json(ErrorResponse);
//   }
// }

module.exports = {
  createJobSeeker,
  getJobSeekerProfileByUserId,
  addEducationToJobSeeker,
  addExperienceToJobSeeker,
  addResumeToJobSeeker,
  getResumesByJobSeekerUserId,
  deleteResume,
  addVideoToJobSeeker,
  getVideosByJobSeekerUserId,
  deleteVideo,
};
