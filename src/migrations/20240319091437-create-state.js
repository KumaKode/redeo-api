"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "States",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        stateCode: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: "stateCode_countryCode",
        },
        countryCode: {
          type: Sequelize.STRING,
          allowNull: false,
          references: {
            model: "Countries",
            key: "countryCode",
          },
          unique: "stateCode_countryCode",
          onDelete: "CASCADE",
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      },
      {
        uniqueKeys: {
          stateCode_countryCode: {
            fields: ["stateCode", "countryCode"],
            unique: true,
            customIndex: true,
          },
        },
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("States");
  },
};
