const CrudRepository = require("./crud-repository");
const { SocialLinks } = require("../models");

class SocialLinksRepository extends CrudRepository {
  constructor() {
    super(SocialLinks);
  }

  async getAllSocialLinksByJobSeekerId(jobSeekerId) {
    const response = await SocialLinks({
      where: { jobSeekerId },
    });
    return response;
  }

  async getAllSocialLinksByEmployerId(employerId) {
    const response = await SocialLinks({
      where: { employerId },
    });
    return response;
  }
}

module.exports = SocialLinksRepository;
