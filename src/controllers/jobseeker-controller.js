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
      req.user.id
    );
    SuccessResponse.data = jobSeekerProfile;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = error.message;
    ErrorResponse.error = error.explanation;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function getAllJobSeekers() {
  try {
    const jobSeekers = await JobSeekerService.getAllJobSeekers();
    SuccessResponse.data = jobSeekers;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = error.message;
    ErrorResponse.error = error.explanation;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function addEducationToJobSeeker(req, res) {
  try {
    const jobSeekerEducation =
      await JobSeekerEducationService.addEducationToJobSeeker(req.user.id, {
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

async function getEducationsByJobSeekerUserId(req, res) {
  try {
    const jobSeekerEducations =
      await JobSeekerEducationService.getEducationsByJobSeekerUserId(
        req.user.id
      );
    SuccessResponse.data = jobSeekerEducations;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = error.message;
    ErrorResponse.error = error.explanation;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function getEducationByJobSeekerId(req, res) {
  try {
    const jobSeekerEducation =
      await JobSeekerEducationService.getEducationByJobSeekerId(req.body.id);
    SuccessResponse.data = jobSeekerEducation;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = error.message;
    ErrorResponse.error = error.explanation;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function deleteEducation(req, res) {
  try {
    const response = await JobSeekerEducationService.deleteEducation(
      req.body.id
    );
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = error.message;
    ErrorResponse.error = error.explanation;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function updateEducation(req, res) {
  try {
    const education = await JobSeekerEducationService.updateEducation(
      req.body.id,
      req.body.data
    );
    SuccessResponse.data = education;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = error.message;
    ErrorResponse.error = error.explanation;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function addExperienceToJobSeeker(req, res) {
  try {
    const jobSeekerExperience =
      await JobSeekerExperienceService.addExperienceToJobSeeker(req.user.id, {
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

async function getExperiencesByJobSeekerUserId(req, res) {
  try {
    const jobSeekerExperiences =
      await JobSeekerExperienceService.getExperiencesByJobSeekerUserId(
        req.user.id
      );
    SuccessResponse.data = jobSeekerExperiences;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = error.message;
    ErrorResponse.error = error.explanation;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function getExperienceByJobSeekerId(req, res) {
  try {
    const jobSeekerExperience =
      await JobSeekerExperienceService.getExperienceByJobSeekerId(req.body.id);
    SuccessResponse.data = jobSeekerExperience;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = error.message;
    ErrorResponse.error = error.explanation;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function deleteExperience(req, res) {
  try {
    const response = await JobSeekerExperienceService.deleteExperience(
      req.body.id
    );
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = error.message;
    ErrorResponse.error = error.explanation;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function updateExperience(req, res) {
  try {
    const experience = await JobSeekerExperienceService.updateExperience(
      req.body.id,
      req.body.data
    );
    SuccessResponse.data = experience;
    return res.status(StatusCodes.OK).json(SuccessResponse);
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
  getAllJobSeekers,
  addEducationToJobSeeker,
  getEducationsByJobSeekerUserId,
  getEducationByJobSeekerId,
  deleteEducation,
  updateEducation,
  addExperienceToJobSeeker,
  getExperiencesByJobSeekerUserId,
  getExperienceByJobSeekerId,
  deleteExperience,
  updateExperience,
  addResumeToJobSeeker,
  getResumesByJobSeekerUserId,
  deleteResume,
  addVideoToJobSeeker,
  getVideosByJobSeekerUserId,
  deleteVideo,
};
