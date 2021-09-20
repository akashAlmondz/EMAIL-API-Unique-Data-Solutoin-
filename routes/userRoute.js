const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/sendemail', userController.sendEmail);

router.post('/save-user', userController.Signup);
router.put('/update-user/:id',userController.updateUser);

module.exports = router;