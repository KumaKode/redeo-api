"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Job.init(
    {
      employerId: DataTypes.INTEGER,
      jobTitle: DataTypes.STRING,
      //workPlace: DataTypes.ENUM,
      //jobType: DataTypes.ENUM,
      skills: DataTypes.STRING,
      jobDescription: DataTypes.TEXT,
      jobLocation: DataTypes.STRING,
      experience: DataTypes.INTEGER,
      salary: DataTypes.STRING,
      isActive: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Job",
    }
  );
  return Job;
};
