const RestaurantModel = require('../models/RestaurantModel');

class RestaurantController {

    static async getRestaurantList(req, res) {
        try{
            const restaurantList = await RestaurantModel.getRestaurantList();
            res.status(200).json(restaurantList);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    };

    static async getRestaurantById(req, res) {
        const restaurantId = req.params.id;
        try {
            const restaurant = await RestaurantModel.getRestaurantById(restaurantId);
            if (restaurant) {
                res.json(restaurant);
            } else {
                res.status(404).json({ message: 'Restaurant not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async getRestaurantByName(req, res) {
        const name = req.params.name;   
        try {
            const restaurant = await RestaurantModel.getRestaurantByName(name);
            if (restaurant) {
                res.json(restaurant);
            } else {
                res.status(404).json({ message: 'Restaurant not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

}

module.exports = RestaurantController;