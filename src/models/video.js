"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Video extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Job, {
        through: "ApplyJob",
        foreignKey: "videoId",
      });

      this.belongsTo(models.JobSeeker, {
        foreignKey: "jobSeekerId",
        onDelete: "CASCADE",
      });
    }
  }
  Video.init(
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
      modelName: "Video",
    }
  );
  return Video;
};
