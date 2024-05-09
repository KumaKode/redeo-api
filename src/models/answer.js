"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Answer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Job, {
        foreignKey: "jobId",
        onDelete: "CASCADE",
      });

      this.belongsTo(models.JobSeeker, {
        foreignKey: "jobSeekerId",
        onDelete: "CASCADE",
      });

      this.belongsTo(models.Question, {
        foreignKey: "questionId",
        onDelete: "CASCADE",
      });
    }
  }
  Answer.init(
    {
      jobId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      jobSeekerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      questionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      answer: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Answer",
    }
  );
  return Answer;
};
