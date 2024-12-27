const mapService = require('../services/maps.service');

module.exports.getCoordinates = async (req, res) => {
    const {address} = req.query;
    try {
        const address = req.query.address;
        const coordinates = await mapService.getAddressCoordinates(address);
        res.status(200).json({
            status: 'success',
            data: coordinates
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });}
    }

    module.exports.getDistanceTime = async (req, res, next) => {

        try {
    
            
    
            const { origin, destination } = req.query;
    
            const distanceTime = await mapService.getDistanceTime(origin, destination);
    
            res.status(200).json(distanceTime);
    
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
    

module.exports.getAutoCompleteSuggestions = async (req, res, next) => {
    try {
        const { input } = req.query;
        const suggestions = await mapService.getAutoCompleteSuggestions(input);
        res.status(200).json(suggestions);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}