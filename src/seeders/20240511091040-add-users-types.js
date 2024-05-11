"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "UserTypes",
      [
        {
          userId: "1",
          typeId: "2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: "2",
          typeId: "2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: "3",
          typeId: "2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
