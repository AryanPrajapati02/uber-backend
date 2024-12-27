const express = require('express'); 
const router = express.Router();
const {authUser} = require('../middlewares/auth.middleware');

const userController = require('../controllers/user.controller');
const {body} = require('express-validator');

// Register a new user
router.post('/register',[
    body('fullname.firstname')
        .isLength({ min: 3 })
        .withMessage('Firstname should be at least 3 characters long'),
    body('fullname.lastname')
        .optional()
        .isLength({ min: 3 })
        .withMessage('Lastname should be at least 3 characters long'),
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password should be at least 6 characters long')
] , userController.registerUser);
// Login a user
router.post('/login', [
    body('email')
    .isEmail()
    .withMessage('Please enter a valid email'),
body('password')
    .isLength({ min: 6 })
    .withMessage('Password should be at least 6 characters long')
], userController.loginUser);

// Get User Profile

router.get('/profile', authUser, userController.getUserProfile);

// Logout
router.get('/logout', authUser, userController.logoutUser);

module.exports = router;