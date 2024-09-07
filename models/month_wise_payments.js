'use strict';
const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class MonthWisePayments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define association with the emi_details table
      MonthWisePayments.belongsTo(models.emi_details, {
        foreignKey: 'emi_details_id',
        as: 'emi_details',
        onDelete: 'CASCADE'
      });
    }
  }

  // Initialize the model with the columns
  MonthWisePayments.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    month: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    emi_paid: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    interest_paid: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    principal_paid: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    prepayment: {
      type: DataTypes.DECIMAL(15, 2),
      defaultValue: 0,
      allowNull: false,
    },
    extra_payment: {
      type: DataTypes.DECIMAL(15, 2),
      defaultValue: 0,
      allowNull: false,
    },
    remaining_balance: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    emi_details_id: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      references: {
        model: 'emi_details', // This references the table in the database
        key: 'id'
      },
      onDelete: 'CASCADE',
    }
  }, {
    sequelize,
    modelName: 'month_wise_payments',
    tableName: 'month_wise_payments', // Ensure it matches the table name in your migration
    timestamps: false // No createdAt and updatedAt
  });

  return MonthWisePayments;
};
