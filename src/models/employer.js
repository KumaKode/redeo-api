'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Employer.init({
    userId: DataTypes.INTEGER,
    companyName: DataTypes.STRING,
    companyDescription: DataTypes.TEXT,
    companyLogo: DataTypes.STRING,
    companyBanner: DataTypes.STRING,
    companyWebsite: DataTypes.STRING,
    countryId: DataTypes.INTEGER,
    stateId: DataTypes.INTEGER,
    cityId: DataTypes.INTEGER,
    companyAddress: DataTypes.STRING,
    employees: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Employer',
  });
  return Employer;
};