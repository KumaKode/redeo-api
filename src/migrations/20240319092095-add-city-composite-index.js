"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addIndex(
      "Cities",
      ["name", "stateCode", "countryCode"],
      {
        name: "cityName_stateCode_countryCode",
        unique: true,
        fields: ["name", "stateCode", "countryCode"],
      }
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeIndex(
      "Cities",
      "cityName_stateCode_countryCode"
    );
  },
};
