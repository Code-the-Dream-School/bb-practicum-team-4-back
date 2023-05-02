const express = require('express')
const router = express.Router();
const {
    changePassFunction,
} = require('../controllers/changePass')

router.route('/').post(changePassFunction)
// router.route('/:id').get(getProduct).delete(deleteProduct)

module.exports = router;
