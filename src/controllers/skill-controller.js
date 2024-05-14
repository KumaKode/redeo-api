const { SkillService } = require("../services");
const { StatusCodes } = require("http-status-codes");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

async function createSkill(req, res) {
  try {
    const skill = await SkillService.createSkill({
      name: req.body.name,
    });
    SuccessResponse.data = skill;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = error.message;
    ErrorResponse.error = error.explanation;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function getSkillsByName(req, res) {
  try {
    const skills = await SkillService.getSkillsByName(req.body.name);
    SuccessResponse.data = skills;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = error.message;
    ErrorResponse.error = error.explanation;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function destroySkill(req, res) {
  try {
    const response = await SkillService.destroySkill(req.body.id);
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = error.message;
    ErrorResponse.error = error.explanation;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function updateSkill(req, res) {
  try {
    const skill = await SkillService.updateSkill(req.body.id, {
      name: req.body.name,
    });
    SuccessResponse.data = skill;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = error.message;
    ErrorResponse.error = error.explanation;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = {
  createSkill,
  getSkillsByName,
  destroySkill,
  updateSkill,
};
