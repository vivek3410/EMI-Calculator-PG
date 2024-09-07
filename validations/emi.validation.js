const Joi = require("joi");

const emiCalculatorSchema = Joi.object({
    loan_amount: Joi.number().required(),
    interest_rate: Joi.number().required(),
    loan_tenure_months: Joi.number().required(),
    prepayment_amount: Joi.number().optional().allow(null),
})

module.exports = {
    emiCalculatorSchema
}