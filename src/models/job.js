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
      this.belongsToMany(models.JobSeeker, {
        through: "ApplyJob",
        foreignKey: "jobId",
      });

      this.belongsToMany(models.JobSeekerResume, {
        through: "ApplyJob",
        foreignKey: "jobId",
      });

      this.belongsToMany(models.Video, {
        through: "ApplyJob",
        foreignKey: "jobId",
      });

      this.hasMany(models.Question, {
        foreignKey: "jobId",
      });

      this.hasMany(models.Answer, {
        foreignKey: "jobId",
      });

      this.belongsTo(models.Employer, {
        foreignKey: "employerId",
        onDelete: "CASCADE",
      });

      this.belongsTo(models.JobCategory, {
        foreignKey: "categoryId",
      });
    }
  }
  Job.init(
    {
      employerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      jobTitle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      workPlace: {
        type: DataTypes.ENUM,
        values: ["Remote", "On-site", "Hybrid"],
        allowNull: false,
      },
      jobType: {
        type: DataTypes.ENUM,
        values: ["Full-time", "Part-time", "Internship"],
        allowNull: false,
      },
      skills: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      jobDescription: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      jobLocation: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      experience: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      salary: {
        type: DataTypes.STRING,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "Job",
    }
  );

  return Job;
};
