const express = require('express');
const { createPaymentMethod, getAllPaymentMethods, getPaymentMethod, deletePaymentMethod } = require('../controllers/payment');
const router = express.Router()

const {
    createPaymentMethod,
    getAllPaymentMethods,
    getPaymentMethod,
    deletePaymentMethod
} = require('../controllers/payment')

router.route('/').post(createPaymentMethod).get(getAllPaymentMethods)
router.route('/:id').get(getPaymentMethod).delete(deletePaymentMethod)


module.exports = router;