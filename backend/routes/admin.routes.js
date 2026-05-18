
const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const requireRole = require('../middleware/requireRole');
const adminController = require('../controllers/admin.controller');


router.get('/users', verifyToken, requireRole('admin'), adminController.getAllUsers);
router.get('/users/:id',verifyToken, requireRole('admin'), adminController.getUserById);

router.delete('/users/:id',verifyToken, requireRole('admin'), adminController.deleteUser);

module.exports = router;