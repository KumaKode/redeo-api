"use strict";
const _ = require("lodash");
const states = require("country-state-city").State.getAllStates();

// const data = [];
// const uniqueNames = {};

// states.forEach((obj) => {
//   const cleanName = obj.name.replace(/[^\w\s']/gi, "").toLowerCase();
//   if (!uniqueNames[cleanName]) {
//     uniqueNames[cleanName] = true;
//     data.push(obj);
//   }
// });

const state = states.map((state) => {
  return {
    name: state.name,
    stateCode: state.isoCode,
    countryCode: state.countryCode,
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
    const chunks = _.chunk(state, 100);
    for (let i = 0; i < chunks.length; i++) {
      await queryInterface
        .bulkInsert("States", chunks[i], { ignoreDuplicates: true })
        .then((createdUsers) => {
          console.log(`State Chunk Added.`, i);
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
    await queryInterface.bulkDelete("States", null, {});
  },
};
