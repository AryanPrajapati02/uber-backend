const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const BlacklistToken = require('../models/blacklistToken.model');
const captainModel = require('../models/captain.model');

module.exports.authUser = async(req ,res ,next)=>{
    try{
        const token = req.cookies?.token || req.headers?.authorization?.split(' ')[1];
        if(!token){
            return res.status(401).json({success: false , message: 'Unauthorized'});
        }
        const isBlacklisted = await BlacklistToken.findOne({ token});  //
        if(isBlacklisted){  
            return res.status(401).json({success: false , message: 'Unauthorized'});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id
        );
        if(!user){
            return res.status(401).json({success: false , message: 'User not found'});
        }
        req.user = user;
        return next();

    }catch(err){
        res.status(500).json({success: false , message: err.message});
    }
}

module.exports.authCaptain = async(req ,res ,next)=>{
    try{
        const token = req.cookies?.token || req.headers?.authorization?.split(' ')[1];
        if(!token){
            return res.status(401).json({success: false , message: 'Unauthorized'});
        }
        const isBlacklisted = await BlacklistToken.findOne({ token});  //
        if(isBlacklisted){  
            return res.status(401).json({success: false , message: 'Unauthorized'});
        }
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id
        );
        if(!captain){
            return res.status(401).json({success: false , message: 'captain not found'});
        }
        req.captain = captain;
        return next();

        
    }catch(err){
        res.status(500).json({success: false , message: err.message});
    }
};