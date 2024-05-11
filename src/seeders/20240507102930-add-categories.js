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
      "JobCategories",
      [
        {
          name: "Admin Support",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Customer Service",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Data Science and Analysis",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Engineering and Architecture",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "IT & Networking",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Sales and Marketing",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Translation",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Web, Mobile, & Software Development",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Writing",
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
    await queryInterface.bulkDelete("JobCategories", null, {});
  },
};
