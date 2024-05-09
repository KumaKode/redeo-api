"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ApplyJob extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ApplyJob.init(
    {
      jobId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      jobSeekerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      resumeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      videoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ApplyJob",
    }
  );
  return ApplyJob;
};
