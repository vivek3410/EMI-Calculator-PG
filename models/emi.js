'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EMI extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  EMI.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    loan_amount: DataTypes.DECIMAL,
    interest_rate: DataTypes.DECIMAL,
    loan_tenure_months: DataTypes.INTEGER,
    emi: DataTypes.DECIMAL,
    prepayment_amount: DataTypes.DECIMAL,
    // remaining_balance: DataTypes.DECIMAL,
  }, {
    timestamps: false,
    sequelize,
    modelName: 'emi_details',
  });
  return EMI;
};