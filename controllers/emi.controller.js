// const MonthWisePayments = require("../models/month_wise_payment.model");
const { handleControllerError } = require("../utils/helpers");
const { emiCalculatorSchema } = require("../validations/emi.validation");
const db = require('../models/index')
const EMI = db.models.emi_details;
const MonthWisePayments = db.models.month_wise_payments


const EMICtrl = {
    EMICalculator,
    fetchEmiDetailsWithPayments,
    fetchAllEMIPayments,
    fetchEMIPaymentsById
}

module.exports = EMICtrl


function calculateEMi(loanAmount, interestRate, tenureMonths) {
    const monthlyRate = interestRate / 12 / 100;
    const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / (Math.pow(1 + monthlyRate, tenureMonths) - 1);
    return emi.toFixed(2); // Returns a string
}

async function getUpdatedBreakdown(loanAmount, interestRate, tenureMonths, prepaymentAmount) {
    const monthlyRate = interestRate / 12 / 100;
    let remainingBalance = loanAmount;
    let monthWisePayments = [];
    let monthsPassed = 0;


    // Calculate initial EMI
    let emi = calculateEMi(remainingBalance, interestRate, tenureMonths);

    while (remainingBalance > 0 && monthsPassed < tenureMonths) {
        monthsPassed++;
        const interestPaid = remainingBalance * monthlyRate;
        const principalPaid = emi - interestPaid;

        // Apply prepayment if it's provided
        if (prepaymentAmount && monthsPassed === 1) {
            remainingBalance -= prepaymentAmount;
            if (remainingBalance < 0) {
                remainingBalance = 0;
            }
        }

        // Calculate new EMI if remaining balance is lower
        // emi = calculateEMi(remainingBalance, interestRate, tenureMonths - monthsPassed + 1);


        // Calculate principal paid after adjusting EMI
        const adjustedPrincipalPaid = emi - interestPaid;
        remainingBalance -= adjustedPrincipalPaid;
        if (remainingBalance < 0) {
            remainingBalance = 0;
        }

        monthWisePayments.push({
            month: monthsPassed,
            emiPaid: parseFloat(emi),
            interestPaid: parseFloat(interestPaid.toFixed(2)),
            principalPaid: parseFloat(adjustedPrincipalPaid.toFixed(2)),
            prepayment: monthsPassed === 1 ? prepaymentAmount || 0 : 0,
            remainingBalance: parseFloat(remainingBalance.toFixed(2)),
        });

        if (remainingBalance === 0) {
            break;
        }
    }

    const updatedTenureMonths = monthsPassed;

    return { monthWisePayments, updatedTenureMonths, emi };
}
async function EMICalculator(req) {
    try {
        const { error } = emiCalculatorSchema.validate(req.body);
        if (error) {
            throw Error(error.details[0].message);
        }

        const { loan_amount, interest_rate, loan_tenure_months, prepayment_amount } = req.body;

        // Calculate month-wise breakdown
        const { monthWisePayments, updatedTenureMonths, emi } = await getUpdatedBreakdown(
            loan_amount,
            interest_rate,
            loan_tenure_months,
            prepayment_amount,
        );

        // Calculate final remaining balance after all payments
        const finalRemainingBalance = monthWisePayments.length ? monthWisePayments[monthWisePayments.length - 1].remainingBalance : loan_amount;



        // Save data into the database
        const emiData = await EMI.create({
            loan_amount,
            interest_rate,
            loan_tenure_months: updatedTenureMonths, // Use the updated tenure
            emi,
            prepayment_amount: prepayment_amount || 0,
            // remaining_balance: finalRemainingBalance
        });

        console.log(emiData.id);


        for (const payment of monthWisePayments) {

            await MonthWisePayments.create({
                emi_details_id: emiData.id,
                month: payment.month,
                emi_paid: payment.emiPaid,
                interest_paid: payment.interestPaid,
                principal_paid: payment.principalPaid,
                prepayment: payment.prepayment,
                remaining_balance: payment.remainingBalance
            })
        }

        // Return the EMI, prepayment details, and month-wise breakdown

        console.log(emi);
        return {
            emi: emi,
            prepayment_amount: prepayment_amount || 0,
            monthWisePayments: monthWisePayments
        };
    } catch (e) {
        throw handleControllerError(e);
    }
}



async function fetchEmiDetailsWithPayments() {
    try {
        const data = await db.models.email_details.findAll()
        return data;
    } catch (e) {
        throw handleControllerError(e)
    }
}

async function fetchAllEMIPayments() {
    try {
        // Fetch all month-wise payments along with their corresponding EMI details
        const emiPayments = await MonthWisePayments.findAll({
            include: [
                {
                    model: db.models.emi_details, // Include EMI details
                    as: 'emi_details'
                }
            ]
        });

        if (!emiPayments || emiPayments.length === 0) {
            return { message: "No EMI payments found" };
        }

        // Create a structured array where each entry contains EMI details and corresponding month-wise payment details
        const result = emiPayments.map(payment => ({
            emi_details: {
                id: payment.emi_details.id,
                loan_amount: payment.emi_details.loan_amount,
                interest_rate: payment.emi_details.interest_rate,
                loan_tenure_months: payment.emi_details.loan_tenure_months,
                emi: payment.emi_details.emi,
                prepayment_amount: payment.emi_details.prepayment_amount,
                remaining_balance: payment.emi_details.remaining_balance
            },
            month_wise_payment: {
                month: payment.month,
                emi_paid: payment.emi_paid,
                interest_paid: payment.interest_paid,
                principal_paid: payment.principal_paid,
                prepayment: payment.prepayment,
                remaining_balance: payment.remaining_balance
            }
        }));

        return result;
    } catch (e) {
        console.error('Error fetching all EMI payments:', e);
        throw handleControllerError(e);
    }
}


async function fetchEMIPaymentsById(req) {
    try {
        const emiPayments = await MonthWisePayments.findAll({
            where: {
                emi_details_id: req.params.id
            },
            include: [
                {
                    model: db.models.emi_details,
                    as: 'emi_details'
                }
            ]
        })

        if (!emiPayments || emiPayments.length === 0) {
            return { message: "No EMI payments found for the given ID" };
        }

        // Assuming all rows have the same EMI details (because they refer to the same emi_details_id)
        const emiDetails = emiPayments[0].emi_details;

        // Create a structured object with EMI details and corresponding payments
        const result = {
            id: emiDetails.id,
            loanAmount: emiDetails.loan_amount,
            interestRate: emiDetails.interest_rate,
            loanTenureMonths: emiDetails.loan_tenure_months,
            emi: emiDetails.emi,
            prepayment: emiDetails.prepayment_amount,
            remaining_balance: emiDetails.remaining_balance,
            monthWisePayments: emiPayments.map(payment => ({
                month: payment.month,
                emi_paid: payment.emi_paid,
                interest_paid: payment.interest_paid,
                principal_paid: payment.principal_paid,
                prepayment: payment.prepayment,
                remaining_balance: payment.remaining_balance
            }))
        };

        return result;
    } catch (e) {
        throw handleControllerError(e)
    }
}