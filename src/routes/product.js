const express = require('express')
const router = express.Router();
const {
    createProduct,
    getAllProducts,
    getProduct,
    deleteProduct
} = require('../controllers/product')

router.route('/').post(createProduct).get(getAllProducts)
router.route('/:id').get(getProduct).delete(deleteProduct)


module.exports = router;
