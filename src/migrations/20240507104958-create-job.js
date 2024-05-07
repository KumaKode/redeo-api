"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Jobs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      employerId: {
        type: Sequelize.INTEGER,
      },
      jobTitle: {
        type: Sequelize.STRING,
      },
      // workPlace: {
      //   type: Sequelize.ENUM
      // },
      // jobType: {
      //   type: Sequelize.ENUM
      // },
      skills: {
        type: Sequelize.STRING,
      },
      jobDescription: {
        type: Sequelize.TEXT,
      },
      jobLocation: {
        type: Sequelize.STRING,
      },
      experience: {
        type: Sequelize.INTEGER,
      },
      salary: {
        type: Sequelize.STRING,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Jobs");
  },
};
