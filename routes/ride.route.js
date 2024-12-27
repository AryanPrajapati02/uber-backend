const express = require('express');
const router = express.Router();
const {body ,query} = require('express-validator');
const {createRide , getFare , confirmRide , startRide , endRide} = require('../controllers/ride.controller');
const {authUser, authCaptain} =require('../middlewares/auth.middleware')



router.post('/create' ,
    authUser,
    
    body('pickup').isString({min: 3}).withMessage('Invalid pickup address'),
    body('destination').isString({min: 3}).withMessage('Invalid destination address'),
    body('vehicleType').isIn(['auto', 'car', 'moto']).withMessage('Invalid vehicle type'),
    createRide

 )

router.get('/get-fare' ,authUser, 
    query('pickup').isString({min: 3}).withMessage('Invalid pickup address'),
    query('destination').isString({min: 3}).withMessage('Invalid destination address'),
    getFare
    );


    router.post('/confirm',
        authCaptain,
        body('rideId').isMongoId().withMessage('Invalid ride id'),
      confirmRide
    )
    
    router.get('/start-ride',
        authCaptain,
        query('rideId').isMongoId().withMessage('Invalid ride id'),
        query('otp').isString().isLength({ min: 6, max: 6 }).withMessage('Invalid OTP'),
      startRide
    )
    
    router.post('/end-ride',
        authCaptain,
        body('rideId').isMongoId().withMessage('Invalid ride id'),
      endRide
    )
    
 module.exports = router;