
const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const userController = require('../controllers/user.controller');


router.get('/profile',    verifyToken, userController.getUserInfo );
router.put('/profile',    verifyToken, userController.updateProfile);

module.exports = router;