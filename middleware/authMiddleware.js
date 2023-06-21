// const jwt = require('jsonwebtoken');
// const config = require('../config/passport');

// // Middleware to verify JWT token
// exports.verifyToken = (req, res, next) => {
//   const token = req.headers.authorization;

//   if (!token) {
//     return res.status(401).json({ message: 'No token provided' });
//   }

//   jwt.verify(token, config.jwt.secret, (err, decoded) => {
//     if (err) {
//       return res.status(401).json({ message: 'Invalid token' });
//     }

//     req.userId = decoded.userId;
//     next();
//   });
// };
