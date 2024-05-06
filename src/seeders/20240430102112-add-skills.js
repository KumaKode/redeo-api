"use strict";
const _ = require("lodash");
const fs = require("fs");
var path = require("path");

// Function to read a file and return an array of names and dates
function readNamesFromFile(filePath) {
  const fileContent = fs.readFileSync(filePath, "utf8");
  return fileContent.split("\n").map((name) => name.trim());
}

// Array to store all names from all files
let namesArray = [];

// Read each file and add names to the array
for (let i = 1; i <= 3; i++) {
  var filePath = path.join(__dirname, `data/Skills_${i}.txt`);
  const names = readNamesFromFile(filePath);
  namesArray = namesArray.concat(names);
}

// Create an array of objects with name as key and value
const namesObjectsArray = namesArray.map((name) => ({
  name: name,
  createdAt: new Date(),
  updatedAt: new Date(),
}));

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
    const chunks = _.chunk(namesObjectsArray, 1000);
    for (let i = 0; i < chunks.length; i++) {
      await queryInterface
        .bulkInsert("Skills", chunks[i], { ignoreDuplicates: true })
        .then((createdUsers) => {
          console.log(`Skills Chunk Added.`, i);
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
  },
};
