'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('emi_details', [
      {
        id: 1,
        loan_amount: 45000,
        interest_rate: 9.2,
        loan_tenure_month: 10,
        emi: 2000,
        prepayment_amount: 0,
        remaining_balance: 0,
        created_at: new Date(),
        updated_at: new Date(),
      }
    ], {})
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('emi_details', null, {})
  }
};
