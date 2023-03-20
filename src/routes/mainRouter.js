const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController.js');

// Main page
router.get('/', mainController.get);

module.exports = router;
