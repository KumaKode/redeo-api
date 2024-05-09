"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.State, {
        foreignKey: "countryCode",
        onDelete: "CASCADE",
      });

      this.belongsTo(models.State, {
        foreignKey: "stateCode",
        onDelete: "CASCADE",
      });

      this.hasMany(models.JobSeeker, {
        foreignKey: "cityId",
      });

      this.hasMany(models.Employer, {
        foreignKey: "cityId",
      });
    }
  }
  City.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      stateCode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      countryCode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "City",
      indexes: [
        {
          name: "cityName_stateCode_countryCode",
          unique: true,
          fields: ["name", "stateCode", "countryCode"],
        },
      ],
    }
  );
  return City;
};
