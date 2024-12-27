const captainModel = require('../models/captain.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports.createCaptain = async({
    firstname, lastname, email, password, color, plate, capacity, vehicleType
}) => {
    if(!firstname || !email || !password || !color || !plate || !capacity || !vehicleType){
        throw new Error('All fields are required');
    }
    try{
        
        const captain = await captainModel.create({
            fullname:{
                firstname,
                lastname
            },
            email,
            password,
            vehicle:{
                color,
                plate,
                capacity,
                vehicleType
            }
        });
        return captain;
    }
    catch(err){
        
        throw new Error(err.message);
    }

};
