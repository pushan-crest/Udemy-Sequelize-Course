"use strict";
const { faker } = require("@faker-js/faker");

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

    const items = generateFakeItems(100);

    return queryInterface.bulkInsert("products", items, {});
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

function generateFakeItems(rowCounts) {
  const items = [];
  for (let i = 0; i < rowCounts; i++) {
    items.push({
      name: faker.commerce.productName(),
      description: faker.lorem.sentence(),
      amount: faker.commerce.price(),
    });
  }
  return items;
}
