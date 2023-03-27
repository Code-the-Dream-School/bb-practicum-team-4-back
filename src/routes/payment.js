const express = require('express');
const router = express.Router()
const {
    createPaymentMethod,
    getAllPaymentMethods,
    getPaymentMethod,
    deletePaymentMethod,
    updatePaymentMethod
} = require('../controllers/payment')

router.route('/').post(createPaymentMethod).get(getAllPaymentMethods)
router.route('/:id').get(getPaymentMethod).delete(deletePaymentMethod).patch(updatePaymentMethod)


module.exports = router;