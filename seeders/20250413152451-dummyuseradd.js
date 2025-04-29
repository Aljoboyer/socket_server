'use strict';
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
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
      'users',
      [
        {
          user_id: uuidv4(),
          email: 'jd@gmail.com',
          name: 'Jhonny Depp',
          phone: '12345',
          password: await bcrypt.hash('12345678', 10),
          createdAt: new Date(),
          createdAt: new Date(),
        },
        {
          user_id: uuidv4(),
          email: 'rock@gmail.com',
          name: 'ShahRukh',
          phone: '12345',
          password: await bcrypt.hash('12345678', 10),
          createdAt: new Date(),
          createdAt: new Date(),
        },
        // {
        //   user_id: uuidv4(),
        //   email: 'tm@gmail.com',
        //   name: 'Tom Hanks',
        //   phone: '12345',
        //   password: await bcrypt.hash('12345678', 10),
        //   createdAt: new Date(),
        //   createdAt: new Date(),
        // },
        // {
        //   user_id: uuidv4(),
        //   email: 'bp@gmail.com',
        //   name: 'Brat Pitt',
        //   phone: '12345',
        //   password: await bcrypt.hash('12345678', 10),
        //   createdAt: new Date(),
        //   createdAt: new Date(),
        // },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('users', null, {});

  }
};
