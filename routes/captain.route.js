const express = require('express');
const router = express.Router();
const captainController = require('../controllers/captain.controller');
const {body} = require('express-validator');
const { authCaptain } = require('../middlewares/auth.middleware');

router.post('/register', 
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
    .withMessage('Password should be at least 6 characters long'),
body('vehicle.color')
    .notEmpty()
    .withMessage('Vehicle color is required'),
body('vehicle.plate')
    .notEmpty()
    .withMessage('Vehicle plate is required'),
body('vehicle.capacity')
    .isInt({ min: 1 })
    .withMessage('Vehicle capacity should be at least 1'),
body('vehicle.vehicleType')
    .notEmpty()
    .withMessage('Vehicle type is required')
    
,captainController.registerCaptain);

router.post('/login',[body('email')
    .isEmail()
    .withMessage('Please enter a valid email'),
body('password')
    .isLength({ min: 6 })
    .withMessage('Password should be at least 6 characters long')], captainController.loginCaptain);

router.get('/profile', authCaptain, captainController.getCaptainProfile);

router.get('/logout',authCaptain, captainController.logoutCaptain);

module.exports = router;






