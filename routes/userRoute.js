const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/sendemail', userController.sendEmail);

router.post('/save-user', userController.Signup);

module.exports = router;