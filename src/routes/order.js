const express = require('express')
const router = express.Router();
const  {
    createOrder,
    getAllOrders,
    getOrder,
    deleteOrder
} = require('../controllers/order')

router.route('/').post(createOrder)
router.route('/user/:id').get(getAllOrders)
router.route('/:id').get(getOrder).delete(deleteOrder)


module.exports = router;
