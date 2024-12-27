const mongoose = require('mongoose');
const env = require('dotenv').config();
const url = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/uber';

function connectToDB(){
    mongoose.connect(url)
    .then(()=>{
        console.log('Successfully Connected to DB');
    })
    .catch((err)=>{
        console.log('Error connecting to DB', err);
    });
}

module.exports = connectToDB;