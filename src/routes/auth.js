const express = require('express');
const router = express.Router();
const { register, login, removeUser, updateUser } = require('../controllers/auth')

// Auth
router.post('/register', register)
router.post('/login', login)
router.delete('/removeuser', removeUser)
router.patch('/updateuser', updateUser)

module.exports = router;
