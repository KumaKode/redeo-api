"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class JobSeeker extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Skill, {
        through: "JobSeekerSkill",
      });

      this.belongsToMany(models.Job, {
        through: "ApplyJob",
        foreignKey: "jobSeekerId",
      });

      this.hasMany(models.JobSeekerEducation, {
        foreignKey: "jobSeekerId",
        as: "education",
      });

      this.hasMany(models.JobSeekerExperience, {
        foreignKey: "jobSeekerId",
        as: "experience",
      });

      this.hasMany(models.JobSeekerResume, {
        foreignKey: "jobSeekerId",
        as: "resume",
      });

      this.hasMany(models.Answer, {
        foreignKey: "jobSeekerId",
      });

      this.hasMany(models.Video, {
        foreignKey: "jobSeekerId",
      });

      this.hasMany(models.SocialLinks, {
        foreignKey: "jobSeekerId",
      });

      this.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE",
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
  JobSeeker.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      occupation: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
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
      totalExp: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "JobSeeker",
    }
  );
  return JobSeeker;
};
