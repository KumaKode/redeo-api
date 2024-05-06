"use strict";
const cities = require("country-state-city").City.getAllCities();
const _ = require("lodash");

// const data = [];
// const uniqueNames = {};

// cities.forEach((obj) => {
//   const cleanName = obj.name.replace(/[^\w\s']/gi, "").toLowerCase();
//   if (!uniqueNames[cleanName]) {
//     uniqueNames[cleanName] = true;
//     data.push(obj);
//   }
// });

const city = cities.map((city) => {
  return {
    name: city.name,
    stateCode: city.stateCode,
    countryCode: city.countryCode,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
});

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

    const chunks = _.chunk(city, 1000);
    for (let i = 0; i < chunks.length; i++) {
      await queryInterface
        .bulkInsert("Cities", chunks[i], { ignoreDuplicates: true })
        .then((createdUsers) => {
          console.log(`City Chunk Added.`, i);
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
    await queryInterface.bulkDelete("Cities", null, {});
  },
};
