"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SocialLinks extends Model {
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

      this.belongsTo(models.Employer, {
        foreignKey: "employerId",
        onDelete: "CASCADE",
      });
    }
  }
  SocialLinks.init(
    {
      jobSeekerId: {
        type: DataTypes.INTEGER,
      },
      employerId: {
        type: DataTypes.INTEGER,
      },
      platform: {
        type: DataTypes.ENUM,
        values: ["Facebook", "Twitter", "Instagram", "LinkedIn", "Github"],
        allowNull: false,
      },
      link: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "SocialLinks",
    }
  );
  return SocialLinks;
};
