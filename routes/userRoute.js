const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/get-data/:userId',userController.getData);
router.post('/sendemail', userController.sendEmail);

router.post('/save-user', userController.Signup);
router.put('/update-user/:id',userController.updateUser);
router.put('/update-status/:id',userController.updateStatus);

module.exports = router;