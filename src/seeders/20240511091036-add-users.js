"use strict";
const bcrypt = require("bcrypt");
const { ServerConfig } = require("../config");

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
      "Users",
      [
        {
          fullName: "Alex Doe",
          email: "test1@gmail.com",
          password: bcrypt.hashSync("123456789", +ServerConfig.SALT_ROUNDS),
          dob: "1990-01-01",
          age: 34,
          emailVerified: true,
          gender: "Male",
          socialLogin: "Local",
          type: "jobSeeker",
          profilePicture: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fullName: "Sam Maggot",
          email: "test2@gmail.com",
          password: bcrypt.hashSync("123456789", +ServerConfig.SALT_ROUNDS),
          dob: "1990-01-01",
          age: 34,
          emailVerified: true,
          gender: "Male",
          socialLogin: "Local",
          type: "jobSeeker",
          profilePicture: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fullName: "Maya Wong",
          email: "test3@gmail.com",
          password: bcrypt.hashSync("123456789", +ServerConfig.SALT_ROUNDS),
          dob: "1990-01-01",
          age: 34,
          emailVerified: true,
          gender: "Female",
          socialLogin: "Local",
          profilePicture: "",
          type: "employer",
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
    await queryInterface.bulkDelete("Users", null, {});
  },
};
