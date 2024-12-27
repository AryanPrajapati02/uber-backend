const BlacklistToken = require('../models/blacklistToken.model');
const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');

const registerCaptain = async (req, res) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        const {fullname , email , password , vehicle
        } = req.body;
        const existingCaptain = await captainModel.findOne({email});
        if(existingCaptain){
            return res.status(400).json({success: false, message: 'Captain already exists'});
        }
        const hashPassword = await captainModel.hashPassword(password);
        const captain = await captainService.createCaptain({firstname : fullname.firstname, lastname:fullname.lastname, email, password: hashPassword, color : vehicle.color , plate:vehicle.plate, capacity:vehicle.capacity, vehicleType:vehicle.vehicleType});
        const token = captain.generateAuthToken();
        res.header('Authorization', `Bearer ${token}`);
        res.cookie('token', token, { httpOnly: true, secure: true });
        res.status(201).json({success: true, message: "Captain account created Successfully " , captain: captain , token: token});
        


    }catch(err){
        res.status(500).json({success: false , message: err.message});
    }
}

const loginCaptain = async (req, res) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        const {email, password} = req.body;
        const captain = await captainModel.findOne({email}).select('+password');
        if(!captain){
            return res.status(404).json({success: false, message: 'Captain not found'});
        }
        const isMatch = await captain.comparePassword(password);
        if(!isMatch){
            return res.status(400).json({success: false, message: 'Invalid credentials'});
        }
        const token = captain.generateAuthToken();
        res.header('Authorization', `Bearer ${token}`);
        res.cookie('token', token, { httpOnly: true, secure: true });

        res.status(200).json({success: true,message: "Captain Login Successfully" ,  captain: captain , token: token});

    }catch(err){
        res.status(500).json({success: false , message: err.message});
    }
}

const getCaptainProfile = async (req, res) => {
    try{
        const captain = req.captain;
        res.status(200).json({success: true, captain: captain});

    }catch(err){
        res.status(500).json({success: false , message: err.message});
    }
}

const logoutCaptain = async (req, res) => {
    try{
        const token = req.cookies?.token || req.headers?.authorization?.split(' ')[1];
        if(!token){
            return res.status(401).json({success: false, message: 'Unauthorized'});
        }
        const blacklistedToken = await BlacklistToken.create({token});
        res.clearCookie('token');
        res.status(200).json({success: true, message: 'Captain Logged out successfully'});

    }catch(err){
        res.status(500).json({success: false, message: err.message});
    }
}

module.exports = {
    registerCaptain,
    loginCaptain,
    getCaptainProfile,
    logoutCaptain
 
}
