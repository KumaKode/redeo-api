const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");

const { EmployerRepository } = require("../repositories");

const employerRepository = new EmployerRepository();
const UserService = require("./user-service");

async function createEmployer(data) {
  try {
    const update = await UserService.updateUser(data.userId, {
      dob: data.dob,
      gender: data.gender,
      age: data.age,
    });

    const employer = await employerRepository.create(data);
    return [employer, update];
  } catch (error) {
    throw new AppError(
      "Something went wrong",
      { explanation: error.message, query: error.sql || "" },
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAllEmployers() {
  try {
    const employers = await employerRepository.findAll();

    if (!employers) {
      throw new AppError(
        "No employers found",
        { explanation: "" },
        StatusCodes.CONFLICT
      );
    }

    return employers;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      "Something went wrong",
      { explanation: error.message, sql: error.sql },
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function updateEmployerProfile(id, data) {
  try {
    const update = await UserService.updateUser(data.userId, {
      dob: data.dob,
      gender: data.gender,
      age: data.age,
    });

    const profile = await employerRepository.update(id, data);

    if (!profile) {
      throw new AppError(
        "The requested employer profile not found",
        { explanation: "" },
        StatusCodes.NOT_FOUND
      );
    }

    return [profile, update];
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      "Something went wrong",
      { explanation: error.message, query: error.sql || "" },
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getEmployerProfileByUserId(id) {
  try {
    const employer = await employerRepository.getEmployerProfileByUserId(id);

    if (!employer) {
      throw new AppError(
        "No employer found for the given user Id",
        { explanation: "" },
        StatusCodes.CONFLICT
      );
    }

    return employer;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      "Something went wrong",
      { explanation: error.message, sql: error.sql },
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getEmployerByUserId(id) {
  try {
    const employer = await employerRepository.getEmployerByUserId(id);

    if (!employer) {
      throw new AppError(
        "No employer found for the given user Id",
        { explanation: "" },
        StatusCodes.CONFLICT
      );
    }

    return employer;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      "Something went wrong",
      { explanation: error.message, sql: error.sql },
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createEmployer,
  getEmployerProfileByUserId,
  updateEmployerProfile,
  getAllEmployers,
  getEmployerByUserId,
};
