
const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const requireRole = require('../middleware/requireRole');
const bookController = require('../controllers/book.controller');


router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBook);


router.post('/',        verifyToken, requireRole('admin'), bookController.createBook);
router.put('/:id',     verifyToken, requireRole('admin'), bookController.updateBook);
router.delete('/:id',  verifyToken, requireRole('admin'), bookController.deleteBook);

module.exports = router;