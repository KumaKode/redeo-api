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
    await queryInterface
      .addConstraint("Cities", {
        fields: ["stateCode", "countryCode"],
        type: "foreign key",
        name: "State_Table_FKey",
        references: {
          table: "States",
          fields: ["stateCode", "countryCode"],
        },
        onDelete: "CASCADE",
      })
      .catch((err) => {
        console.log(err);
      });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeConstraint("Cities", "State_Table_FKey");
  },
};
