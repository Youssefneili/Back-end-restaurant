const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// POST route to create an admin
router.post('/google-login', adminController.createAdmin);

// Google OAuth routes
// router.get('/google', adminController.googleLogin);
// router.get('/google/callback', adminController.googleCallback);
module.exports = router;
