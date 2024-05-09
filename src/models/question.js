"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Answer, {
        foreignKey: "questionId",
      });

      this.belongsTo(models.Job, {
        foreignKey: "jobId",
        onDelete: "CASCADE",
      });
    }
  }
  Question.init(
    {
      jobId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      question: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Question",
    }
  );
  return Question;
};
