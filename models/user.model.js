const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
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
        minlength:[5, 'Email should be atleast 5 characters long'],
    },
    password:{
        type: String,
        required: true,
        trim: true,
        select: false,
        minlength:[6, 'Password should be atleast 6 characters long'],
    },
    socketId:{
        type: String,
    }

})

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET, {expiresIn: '1d'});
    return token;

}
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}
userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10);
}

const User = mongoose.model('user', userSchema);

module.exports = User;