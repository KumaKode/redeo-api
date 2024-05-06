"use strict";
const countries = require("country-state-city").Country.getAllCountries();
const _ = require("lodash");

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
    const data = countries.map((country) => {
      return {
        name: country.name,
        countryCode: country.isoCode,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    const chunks = _.chunk(data, 100);
    for (let i = 0; i < chunks.length; i++) {
      await queryInterface
        .bulkInsert("Countries", chunks[i], {})
        .then((createdUsers) => {
          console.log(`Country Chunk Added.`, i);
        })
        .catch((err) => {
          console.error("Error creating users:", err);
        });
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Countries", null, {});
  },
};
