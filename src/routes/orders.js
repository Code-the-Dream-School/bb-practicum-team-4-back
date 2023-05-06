const express = require('express')
const router = express.Router();
const  { getAllOrdersUnauth } = require('../controllers/order')

router.route('/:id').get(getAllOrdersUnauth)

module.exports = router;