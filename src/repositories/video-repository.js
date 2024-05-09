const CrudRepository = require("./crud-repository");
const { Video } = require("../models");

class VideoRepository extends CrudRepository {
  constructor() {
    super(Video);
  }

  async getVideosByJobSeekerId(id) {
    const response = await Video.findAll({
      where: { jobSeekerId: id },
    });
    return response;
  }
}

module.exports = VideoRepository;
