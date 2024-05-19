const { SocialLinksService } = require("../services");
const { StatusCodes } = require("http-status-codes");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

async function addSocialLinks(req, res) {
  try {
    const socialLink = await SocialLinksService.addSocialLinks({
      jobSeekerId: req.body.jobSeekerId,
      employerId: req.body.employerId,
      platform: req.body.platform,
      link: req.body.link,
    });
    SuccessResponse.data = socialLink;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = error.message;
    ErrorResponse.error = error.explanation;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function getAllSocialLinksByJobSeekerId(req, res) {
  try {
    const socialLinks = await SocialLinksService.getAllSocialLinksByJobSeekerId(
      req.params.jobSeekerId
    );
    SuccessResponse.data = socialLinks;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = error.message;
    ErrorResponse.error = error.explanation;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function getAllSocialLinksByEmployerId(req, res) {
  try {
    const socialLinks = await SocialLinksService.getAllSocialLinksByEmployerId(
      req.params.employerId
    );
    SuccessResponse.data = socialLinks;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = error.message;
    ErrorResponse.error = error.explanation;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function destroySocialLink(req, res) {
  try {
    const response = await SocialLinksService.destroySocialLink(req.params.id);
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = error.message;
    ErrorResponse.error = error.explanation;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function updateSocialLink(req, res) {
  try {
    const city = await SocialLinksService.updateSocialLink(
      req.params.id,
      req.body
    );
    SuccessResponse.data = city;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = error.message;
    ErrorResponse.error = error.explanation;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = {
  addSocialLinks,
  getAllSocialLinksByJobSeekerId,
  getAllSocialLinksByEmployerId,
  destroySocialLink,
  updateSocialLink,
};
