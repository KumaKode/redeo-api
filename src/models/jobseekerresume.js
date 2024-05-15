"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class JobSeekerResume extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Job, {
        through: "ApplyJob",
        foreignKey: "jobSeekerResumeId",
      });

      this.belongsTo(models.JobSeeker, {
        foreignKey: "jobSeekerId",
        onDelete: "CASCADE",
      });
    }
  }
  JobSeekerResume.init(
    {
      jobSeekerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      path: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "JobSeekerResume",
    }
  );
  return JobSeekerResume;
};
