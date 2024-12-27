const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    captain:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'captain'
    },
    pickup:{
        type: String,
        required: true
    },
    destination:{
        type: String,
        required: true
    },
    fare:{
        type: Number,
        required: true
    },
    status:{
        type: String,
        enum: ['pending', 'accepted', 'completed','ongoing', 'cancelled'],
        default: 'pending'
    },
    duration:{
        type: String
    },
    distance:{
        type: String
    },
    paymentID:{
        type: String
    },
    paymentStatus:{
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending'
    },
    orderId:{
        type: String
    },
    otp:{
        type: String,
        select: false,
        required:true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }


})

module.exports = mongoose.model('Ride', rideSchema);