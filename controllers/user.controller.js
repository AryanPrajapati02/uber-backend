const userModel = require('../models/user.model');

const {validationResult} = require('express-validator');
const userService = require('../services/user.service');
const BlacklistToken = require('../models/blacklistToken.model');

const registerUser = async (req ,res ,next )=>{
    try{
        
        const errors = validationResult(req);
     
        if (!errors.isEmpty()) {
           
            return res.status(400).json({ errors: errors.array() });
        }
     
         const {fullname , email , password} = req.body;

         const existingUser = await userModel.findOne({email});
         if(existingUser){
                return res.status(400).json({success: false , message: 'User already exists'});
     
         }
         const hashPassword = await userModel.hashPassword(password);
         const user = await userService.createUser({firstname : fullname.firstname , lastname :fullname.lastname , email , password : hashPassword});
         const token = user.generateAuthToken();

         res.header('Authorization', `Bearer ${token}`);
         res.cookie('token', token, { httpOnly: true, secure: true });

         res.status(201).json({success: true ,message: "User Registered Successfully" ,   token ,user});
     }catch(err){
         res.status(500).json({success: false , message: err.message});
     }
    }


const loginUser = async (req ,res ,next )=>{
    try{
        
        const errors = validationResult(req);
     
        if (!errors.isEmpty()) {
           
            return res.status(400).json({ errors: errors.array() });
        }
     
         const {email , password} = req.body;

         const user = await userModel.findOne({email}).select('+password');
         if(!user){
                return res.status(400).json({success: false , message: 'User does not exist'});
     
         }
         const isMatch = await user.comparePassword(password);
         if(!isMatch){
            return res.status(401).json({success: false , message: 'Invalid credentials'});
         }
         const token = user.generateAuthToken();
         res.header('Authorization', `Bearer ${token}`);
         res.cookie('token', token, { httpOnly: true, secure: true });
         res.status(200).json({success: true , token ,user});
     }catch(err){
         res.status(500).json({success: false , message: err.message});
     }
    }



 const getUserProfile = async (req ,res ,next )=>{
    try{
        const user = req.user;
        res.status(200).json({success: true , user});

    }catch(err){
        res.status(500).json({success: false , message: err.message});
    }
 }   

 const logoutUser = async (req ,res ,next )=>{
    try{
      res.clearCookie('token');
      const token = req.cookies.token || req.headers.authorization.split(' ')[1];

     await BlacklistToken.create({token});

      res.status(200).json({success: true , message: 'Logged out successfully'});
    }catch(err){
        res.status(500).json({success: false , message: err.message});
    }
 }

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    logoutUser
}