'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('emi_details', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      loan_amount: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      interest_rate: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      loan_tenure_months: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      emi: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      prepayment_amount: {
        type: Sequelize.DECIMAL,
        allowNull: true,
        defaultValue: 0,
      },
      // remaining_balance: {
      //   type: Sequelize.DECIMAL,
      //   allowNull: false,
      // },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('emi_details');
  }
};