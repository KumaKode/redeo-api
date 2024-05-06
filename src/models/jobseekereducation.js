"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class JobSeekerEducation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.JobSeeker, {
        foreignKey: "jobSeekerId",
        onDelete: "CASCADE",
      });
    }
  }
  JobSeekerEducation.init(
    {
      jobSeekerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      institute: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      start: {
        type: DataTypes.DATE,
      },
      end: {
        type: DataTypes.DATE,
      },
      degree: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: "JobSeekerEducation",
    }
  );
  return JobSeekerEducation;
};
