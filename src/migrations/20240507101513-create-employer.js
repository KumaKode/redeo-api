"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Employers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        allowNull: false,
      },
      companyName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      companyDescription: {
        type: Sequelize.TEXT,
      },
      companyLogo: {
        type: Sequelize.STRING,
      },
      companyBanner: {
        type: Sequelize.STRING,
      },
      companyWebsite: {
        type: Sequelize.STRING,
      },
      countryId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Countries",
          key: "id",
        },
        allowNull: false,
      },
      stateId: {
        type: Sequelize.INTEGER,
        references: {
          model: "States",
          key: "id",
        },
        allowNull: false,
      },
      cityId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Cities",
          key: "id",
        },
        allowNull: false,
      },
      companyAddress: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      employees: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Employers");
  },
};
