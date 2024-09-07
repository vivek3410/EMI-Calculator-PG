const express = require('express');
const EMICtrl = require('../controllers/emi.controller');
const { createResponse, createError } = require('../utils/helpers');
const { resStatusCode, resMsg } = require('../config/constants');
const asyncHandler = require('express-async-handler')

const router = express.Router()

module.exports = router;

router.get('/health-check', (req, res) => {
    console.log("OK");
})


router.post('/calculate-emi', asyncHandler(EMICalculator))

router.get('/emis', asyncHandler(fetchAllEMIPayments))

router.get('/emis/:id', asyncHandler(fetchEMIPaymentsById))



async function EMICalculator(req, res, next) {
    try {
        let response = await EMICtrl.EMICalculator(req);
        if (response) return createResponse(res, resStatusCode.CREATED, resMsg.CREATED, response);
        else
            return createError(res, resStatusCode.UNABLE_CREATE, { message: resMsg.UNABLE_CREATE })
    } catch (e) {
        return createError(res, resStatusCode.BAD_REQUEST, e)
    }
}

async function fetchEmiDetailsWithPayments(req, res, next) {
    try {
        let response = await EMICtrl.fetchEmiDetailsWithPayments(req);
        if (response) return createResponse(res, resStatusCode.CREATED, resMsg.CREATED, response);
        else
            return createError(res, resStatusCode.UNABLE_CREATE, { message: resMsg.UNABLE_CREATE })
    } catch (e) {
        return createError(res, resStatusCode.BAD_REQUEST, e)
    }
}

async function fetchAllEMIPayments(req, res, next) {
    try {
        let response = await EMICtrl.fetchAllEMIPayments(req);
        if (response) return createResponse(res, resStatusCode.CREATED, resMsg.CREATED, response);
        else
            return createError(res, resStatusCode.UNABLE_CREATE, { message: resMsg.UNABLE_CREATE })
    } catch (e) {
        return createError(res, resStatusCode.BAD_REQUEST, e)
    }
}

async function fetchEMIPaymentsById(req, res, next) {
    try {
        let response = await EMICtrl.fetchEMIPaymentsById(req);
        if (response) return createResponse(res, resStatusCode.SUCCESS_FETCH, resMsg.SUCCESS_FETCH, response);
        else
            return createError(res, resStatusCode.UNABLE_FETCH, { message: resMsg.UNABLE_FETCH })
    } catch (e) {
        return createError(res, resStatusCode.BAD_REQUEST, e)
    }
}