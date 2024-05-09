"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Answers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      jobId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Jobs",
          key: "id",
        },
        allowNull: false,
      },
      jobSeekerId: {
        type: Sequelize.INTEGER,
        references: {
          model: "JobSeekers",
          key: "id",
        },
        allowNull: false,
      },
      questionId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Questions",
          key: "id",
        },
        allowNull: false,
      },
      answer: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("Answers");
  },
};
