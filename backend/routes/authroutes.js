const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const auth = require('../middleware/authmiddleware');
const { register, login, getUser, logout, resetPassword } = require('../controllers/authcontroller');

// @route   POST /api/auth/reset-password
// @desc    Reset user password
router.post('/reset-password', resetPassword);

// @route   POST /api/auth/register
// @desc    Register user
router.post(
  '/register',
  [
    body('username', 'Username is required').not().isEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password must be at least 6 characters').isLength({ min: 6 })
  ],
  register
);

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
router.post(
  '/login',
  [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password is required').exists()
  ],
  login
);

// @route   GET /api/auth/user
// @desc    Get user data
router.get('/user', auth, getUser);

// @route   POST /api/auth/logout
// @desc    Logout user
router.post('/logout', auth, logout);

module.exports = router;