const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/send-email', userController.sendEmail);

module.exports = router;