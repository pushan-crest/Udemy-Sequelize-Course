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

    return queryInterface.bulkInsert("categories", items, {});
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

function generateFakeItems() {
  // for categories with name, categoryImage and status make faker inputs
  const items = [];
  for (let i = 0; i < 100; i++) {
    items.push({
      name: faker.commerce.productName(),
      categorylmage: faker.image.url(),
      status: 1,
    });
  }
  return items;
}
