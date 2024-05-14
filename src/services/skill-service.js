const { StatusCodes } = require("http-status-codes");
const { SkillRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");

const skillRepository = new SkillRepository();

async function createSkill(data) {
  try {
    const skill = await skillRepository.create(data);
    return skill;
  } catch (error) {
    throw new AppError(
      "Cannot Create a new Skill Object!",
      { explanation: error.message, query: error.sql || "" },
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getSkillsByName(name) {
  try {
    const skills = await skillRepository.getSkillsByName(name);
    return skills;
  } catch (error) {
    console.log(error);
    throw new AppError(
      "Cannot fetch data of all the skills",
      { explanation: error.message, query: error.sql || "" },
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getSkill(id) {
  try {
    const skill = await skillRepository.get(id);

    if (!skill) {
      throw new AppError(
        "The requested skill not found",
        { explanation: "" },
        StatusCodes.NOT_FOUND
      );
    }

    return skill;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      "Something went wrong",
      { explanation: error.message, query: error.sql || "" },
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function destroySkill(id) {
  try {
    const response = await skillRepository.destroy(id);

    if (!response) {
      throw new AppError(
        "The requested skill not found",
        { explanation: "" },
        StatusCodes.NOT_FOUND
      );
    }

    return response;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      "Something went wrong",
      { explanation: error.message, query: error.sql || "" },
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function updateSkill(id, data) {
  try {
    const skill = await skillRepository.update(id, data);

    if (!skill) {
      throw new AppError(
        "The requested skill not found",
        { explanation: "" },
        StatusCodes.NOT_FOUND
      );
    }

    return skill;
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
  getSkillsByName,
  createSkill,
  destroySkill,
  updateSkill,
};
