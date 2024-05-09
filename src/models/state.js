"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class State extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Country, {
        foreignKey: "countryCode",
        onDelete: "CASCADE",
      });

      this.hasMany(models.JobSeeker, {
        foreignKey: "stateId",
      });

      this.hasMany(models.Employer, {
        foreignKey: "stateId",
      });

      this.hasMany(models.City, {
        foreignKey: "id",
      });
    }
  }
  State.init(
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
      modelName: "State",
      indexes: [
        {
          name: "stateCode_countryCode",
          unique: true,
          fields: ["stateCode", "countryCode"],
        },
      ],
    }
  );
  return State;
};
