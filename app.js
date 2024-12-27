const env = require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();


const connectToDB = require('./DB/db');
connectToDB();
const userRoute = require('./routes/user.route');
const captainRoute = require('./routes/captain.route');
const rideRoute = require('./routes/ride.route')
const mapRoute = require('./routes/maps.route');
const cookieParser = require('cookie-parser');

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.get('/', (req, res) => {
    res.send('Hello World!');
}
);
app.use('/api/users', userRoute);
app.use('/api/captains', captainRoute);
app.use('/api/rides', rideRoute);
app.use('/api/maps', mapRoute);


module.exports = app;