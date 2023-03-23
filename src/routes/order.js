const express = require('express')
const router = express.Router();
const  {
    createOrder,
    getAllOrders,
    getOrder,
    deleteOrder
} = require('../controllers/order')

router.route('/').post(createOrder).get(getAllOrders)
router.route('/:id').get(getOrder).delete(deleteOrder)


module.exports = router;
