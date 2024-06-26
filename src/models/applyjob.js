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
      },
      jobSeekerId: {
        type: DataTypes.INTEGER,
      },
      jobSeekerResumeId: {
        type: DataTypes.INTEGER,
      },
      videoId: {
        type: DataTypes.INTEGER,
      },
      status: {
        type: DataTypes.ENUM("pending", "accepted", "rejected"),
        defaultValue: "pending",
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
