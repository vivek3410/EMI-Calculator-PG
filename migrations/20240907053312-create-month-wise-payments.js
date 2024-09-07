'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('month_wise_payments', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      emi_details_id: {
        type: Sequelize.UUID,
        references: {
          model: 'emi_details',
          key: 'id'
        },
        allowNull: false,
        onDelete: 'CASCADE'
      },
      month: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      emi_paid: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
      },
      interest_paid: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
      },
      principal_paid: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
      },
      prepayment: {
        type: Sequelize.DECIMAL(15, 2),
        defaultValue: 0,
        allowNull: false,
      },
      extra_payment: {
        type: Sequelize.DECIMAL(15, 2),
        defaultValue: 0,
        allowNull: false,
      },
      remaining_balance: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('month_wise_payments');
  }
};