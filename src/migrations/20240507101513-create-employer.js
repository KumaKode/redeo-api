'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Employers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      companyName: {
        type: Sequelize.STRING
      },
      companyDescription: {
        type: Sequelize.TEXT
      },
      companyLogo: {
        type: Sequelize.STRING
      },
      companyBanner: {
        type: Sequelize.STRING
      },
      companyWebsite: {
        type: Sequelize.STRING
      },
      countryId: {
        type: Sequelize.INTEGER
      },
      stateId: {
        type: Sequelize.INTEGER
      },
      cityId: {
        type: Sequelize.INTEGER
      },
      companyAddress: {
        type: Sequelize.STRING
      },
      employees: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Employers');
  }
};