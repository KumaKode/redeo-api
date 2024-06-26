"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Country extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.City, {
        foreignKey: "countryCode",
      });

      this.hasMany(models.JobSeeker, {
        foreignKey: "countryId",
      });

      this.hasMany(models.Employer, {
        foreignKey: "countryId",
      });

      this.hasMany(models.State, {
        foreignKey: "countryCode",
      });
    }
  }
  Country.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      countryCode: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "Country",
      indexes: [{ unique: true, fields: ["name", "countryCode"] }],
    }
  );
  return Country;
};
