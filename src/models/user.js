"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
const { ServerConfig } = require("../config");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Type, {
        through: "UserTypes",
      });

      this.hasOne(models.OTP, {
        foreignKey: "userId",
      });

      this.hasMany(models.JobSeeker, {
        foreignKey: "userId",
      });
    }
  }
  User.init(
    {
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dob: {
        type: DataTypes.DATE,
      },
      age: {
        type: DataTypes.INTEGER,
      },
      emailVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      gender: {
        type: DataTypes.ENUM({
          values: ["Male", "Female", "Other"],
        }),
      },
      socialLogin: {
        type: DataTypes.ENUM({
          values: ["Local", "Google", "Linkedin"],
        }),
        defaultValue: "Local",
        allowNull: false,
      },
      profilePicture: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate(function encrypt(user) {
    const encryptedPassword = bcrypt.hashSync(
      user.password,
      +ServerConfig.SALT_ROUNDS
    );

    user.password = encryptedPassword;
  });
  return User;
};
