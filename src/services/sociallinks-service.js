const { StatusCodes } = require("http-status-codes");
const { SocialLinksRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");

const socialLinksRepository = new SocialLinksRepository();

async function addSocialLinks(data) {
  try {
    const socialLink = await socialLinksRepository.create(data);
    return socialLink;
  } catch (error) {
    throw new AppError(
      "Cannot Create a new Social Link Object!",
      { explanation: error.message, query: error.sql || "" },
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAllSocialLinksByJobSeekerId(id) {
  try {
    const socialLinks =
      await socialLinksRepository.getAllSocialLinksByJobSeekerId(id);
    return socialLinks;
  } catch (error) {
    console.log(error);
    throw new AppError(
      "Cannot fetch data of all the Social Links by given job seeker id",
      { explanation: error.message, query: error.sql || "" },
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAllSocialLinksByEmployerId(id) {
  try {
    const socialLinks =
      await socialLinksRepository.getAllSocialLinksByEmployerId(id);
    return socialLinks;
  } catch (error) {
    console.log(error);
    throw new AppError(
      "Cannot fetch data of all the Social Links by given employer id",
      { explanation: error.message, query: error.sql || "" },
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function destroySocialLink(id) {
  try {
    const response = await socialLinksRepository.destroy(id);

    if (!response) {
      throw new AppError(
        "The requested Social Link not found",
        { explanation: "" },
        StatusCodes.NOT_FOUND
      );
    }

    return response;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      "something went wrong",
      { explanation: error.message, query: error.sql || "" },
      StatusCodes.NOT_FOUND
    );
  }
}

async function updateSocialLink(id, data) {
  try {
    const socialLink = await socialLinksRepository.update(id, data);

    if (!socialLink) {
      throw new AppError(
        "The requested Social Link not found",
        { explanation: "" },
        StatusCodes.NOT_FOUND
      );
    }

    return socialLink;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      "something went wrong",
      { explanation: error.message, query: error.sql || "" },
      StatusCodes.NOT_FOUND
    );
  }
}

module.exports = {
  addSocialLinks,
  getAllSocialLinksByJobSeekerId,
  getAllSocialLinksByEmployerId,
  destroySocialLink,
  updateSocialLink,
};
