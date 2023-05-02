const express = require('express')
const router = express.Router();
const {
    getUser,
    getAllUsers
} = require('../controllers/getUsers.js')

router.route('/').get(getAllUsers)
router.route('/:id').get(getUser)



module.exports = router;
