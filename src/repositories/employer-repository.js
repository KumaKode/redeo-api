const CrudRepository = require("./crud-repository");
const { User, Employer, Country, State, City } = require("../models");

class EmployerRepository extends CrudRepository {
  constructor() {
    super(Employer);
  }

  async getEmployerProfileByUserId(id) {
    const response = await Employer.findAll({
      where: {
        userId: id,
      },
      attributes: [
        "id",
        "companyName",
        "companyAddress",
        "companyDescription",
        "phone",
        "employees",
        "companyLogo",
      ],
      include: [
        {
          model: User,
          required: true,
          attributes: [
            "id",
            "fullName",
            "dob",
            "age",
            "gender",
            "profilePicture",
          ],
        },
        {
          model: Country,
          required: true,
          attributes: ["name"],
        },
        {
          model: State,
          required: true,
          attributes: ["name"],
        },
        {
          model: City,
          required: true,
          attributes: ["name"],
        },
      ],
    });

    return response;
  }

  async getEmployerByUserId(id) {
    const response = await this.model.findOne({
      where: {
        userId: id,
      },
    });

    return response;
  }
}

module.exports = EmployerRepository;
