"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Employer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Job, {
        foreignKey: "employerId",
      });

      this.belongsTo(models.User, {
        foreignKey: "userId",
      });

      this.belongsTo(models.Country, {
        foreignKey: "countryId",
      });

      this.belongsTo(models.State, {
        foreignKey: "stateId",
      });

      this.belongsTo(models.City, {
        foreignKey: "cityId",
      });
    }
  }
  Employer.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      companyName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      companyDescription: {
        type: DataTypes.TEXT,
      },
      companyLogo: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
      },
      companyWebsite: {
        type: DataTypes.STRING,
      },
      countryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      stateId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      companyAddress: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      employees: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Employer",
    }
  );
  return Employer;
};
