const express = require('express');
const router = express.Router();
const { getCoordinates ,getDistanceTime , getAutoCompleteSuggestions } = require('../controllers/map.controller');
const {authUser} = require('../middlewares/auth.middleware');

router.get('/get-coordinates' ,authUser, getCoordinates);
router.get('/get-distance-time' ,authUser , getDistanceTime);
router.get('/get-suggestions' , authUser , getAutoCompleteSuggestions);

module.exports = router;