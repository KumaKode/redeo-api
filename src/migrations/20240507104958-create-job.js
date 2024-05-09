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
        references: {
          model: "Employers",
          key: "id",
        },
        allowNull: false,
      },
      jobTitle: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: "JobCategories",
          key: "id",
        },
        allowNull: false,
      },
      workPlace: {
        type: Sequelize.ENUM,
        values: ["Remote", "On-site", "Hybrid"],
        allowNull: false,
      },
      jobType: {
        type: Sequelize.ENUM,
        values: ["Full-time", "Part-time", "Internship"],
        allowNull: false,
      },
      skills: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      jobDescription: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      jobLocation: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      experience: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      salary: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false,
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
