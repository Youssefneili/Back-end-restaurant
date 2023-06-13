const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// POST route to create an admin
router.post('/admin', adminController.createAdmin);

module.exports = router;
