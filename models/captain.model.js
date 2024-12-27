const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const captainSchema  = new mongoose.Schema({
    fullname:{
        firstname:{
            type: String,
            required: true,
            trim: true,
            minlength:[3, 'Firstname should be atleast 3 characters long'],

        },
        lastname:{
            type: String,
           
            trim: true,
            minlength:[3, 'lastname should be atleast 3 characters long'],

    }
     },
     email:{
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email'],
    lowercase: true,
      },

    password:{
        type: String,
        required: true,
        trim: true,
        select: false,
        minlength:[6, 'Password should be atleast 6 characters long']
    },  
    socketId:{
        type: String,
    },
    isAvailable:{
        type : String,
        enum : ['Active','Inactive'],
        default :'Inactive',
    },
    vehicle:{
        color:{
            type: String,
            required: true,
            trim: true,
            minlength:[3, 'Color should be atleast 3 characters long'],
        },
       
        plate:{
            type: String,
            required: true,
            trim: true,
            minlength:[10, 'Plate should be  10 characters '],
            maxlength:[10, 'Plate should be  10 characters '],
        },
        capacity:{
            type: Number,
            required: true,
            min: [1, 'Capacity should be atleast 1'],
        },
        vehicleType:{
            type: String,
            enum : ['car','bike' , 'auto'],
            required: true,
        }

    },
    location:{
        ltd:{
            type: Number
          
        },
        lng:{
            type: Number
          
        }
    }
})

captainSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET, {expiresIn: '1d'});
    return token;

}
captainSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}
captainSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10);
}

const captainModel = mongoose.model('captain', captainSchema);

module.exports = captainModel;