// const express = require('express');
// const passport = require('passport');
// const router = express.Router();

// // Route for initiating the Google OAuth authentication
// router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// // Route for handling the Google OAuth callback
// router.get(
//   '/auth/google/callback',
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   (req, res) => {
//     // Redirect the user to the frontend dashboard page
//     res.redirect('/admin/dashboard');
//   }
// );

// module.exports = router;
