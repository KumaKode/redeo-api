const CrudRepository = require("./crud-repository");
const { Skill } = require("../models");
const { Op } = require("sequelize");

class SkillRepository extends CrudRepository {
  constructor() {
    super(Skill);
  }

  async getSkillsByName(name) {
    const response = await Skill.findAll({
      where: {
        name: { [Op.like]: `%${name}%` },
      },
      limit: 10,
    });
    return response;
  }
}

module.exports = SkillRepository;
