"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ApplyJobs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      jobId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      jobSeekerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      resumeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      videoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM("pending", "accepted", "rejected"),
        defaultValue: "pending",
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
    await queryInterface.dropTable("ApplyJobs");
  },
};
