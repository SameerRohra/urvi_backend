const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { updateProfile, getProfile } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Register Route
router.post('/register', register);

// Login Route
router.post('/login', login);

// Profile Update Route (PUT)
router.put('/update/:userId', authMiddleware, updateProfile);

// Profile Fetch Route (GET)
router.get('/profile/:userId', authMiddleware, getProfile);

module.exports = router;
