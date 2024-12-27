const rideService = require('../services/ride.service')
const mapService = require('../services/maps.service')
const {validationResult} = require('express-validator');
const {sendMessageToSocketId} = require('../socket')
const rideModel = require('../models/ride.model')

module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const { pickup , destination , vehicleType} = req.body;
    const user = req.user._id.toString()
   

    try {

        
        const pickupCoordinates = await mapService.getAddressCoordinates(pickup);
        const getDistanceTime = await mapService.getDistanceTime(pickup, destination);
        const distance = getDistanceTime.distance.text;
        const time = getDistanceTime.duration.text;
        
        const ride = await rideService.createRide({user, pickup, destination, vehicleType , distance, time});
       

  
       

        const captainsInRadius = await mapService.getCaptainsInRadius(pickupCoordinates.ltd, pickupCoordinates.lng , 5);

        ride.otp=''
       
       
        const rideWithUser = await rideModel.findOne({ _id: ride._id }).populate('user');
      
        // console.log(captainsInRadius)

        captainsInRadius.map(captain => {

            sendMessageToSocketId(captain.socketId, {
                event: 'new-ride',
                data: rideWithUser

            })
            // console.log(captain.socketId)
        })

        res.status(200).json({
            status: 'success',
             ride
        });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: error.message
            });
            }
}

module.exports.getFare = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const { pickup , destination } = req.query;
    try {
        const fare = await rideService.getFare(pickup, destination);
        res.status(200).json({
            status: 'success',
            data: fare
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
}





module.exports.confirmRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await rideService.confirmRide({ rideId, captain: req.captain });

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride
        })

        return res.status(200).json(ride);
    } catch (err) {

        console.log(err);
        return res.status(500).json({ message: err.message });
    }
}

module.exports.startRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId, otp } = req.query;
    console.log(rideId, otp);

    try {
        const ride = await rideService.startRide({ rideId, otp, captain: req.captain });

        console.log(ride);

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-started',
            data: ride
        })

        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports.endRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await rideService.endRide({ rideId, captain: req.captain });

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-ended',
            data: ride
        })



        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    } 
}