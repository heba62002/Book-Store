
const express    = require('express');
const router     = express.Router();
const upload     = require('../middleware/upload');
const verifyToken = require('../middleware/verifyToken');
const requireRole = require('../middleware/requireRole');


router.post(
  '/',
  verifyToken,
  requireRole('admin'),
  upload.single('image'), 
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: 'No files were uploaded' });
    }


    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

    res.status(200).json({ imageUrl });
  }
);

module.exports = router;