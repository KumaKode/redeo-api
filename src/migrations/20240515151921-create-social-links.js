"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("SocialLinks", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      jobSeekerId: {
        type: Sequelize.INTEGER,
        references: {
          model: "JobSeekers",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      employerId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Employers",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      platform: {
        type: Sequelize.ENUM,
      },
      link: {
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
    await queryInterface.dropTable("SocialLinks");
  },
};
