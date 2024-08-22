const mongoose = require('mongoose');
const { Schema } = mongoose;

const restaurantSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    address_obj: {
        street1: String,
        city: String,
        state: String,
        country: String,
        postalcode: String,
        address_string: String
    },
    latitude: String,
    longitude: String,
    phone: String,
    website: String,
    rating: String,
    review_rating_count: {
        "1": String,
        "2": String,
        "3": String,
        "4": String,
        "5": String
    },
    price_level: String,
    features: [String],
    cuisine: [{
        name: String,
        localized_name: String
    }],
    image: [{
        url: String,
        uploaded_at: Date
    }]
});

const Restaurant = mongoose.model('restaurant', restaurantSchema);

class RestaurantModel {

    static async getRestaurantList(){
        return Restaurant.find({},'_id name price_level cuisine features image latitude longitude address_obj rating')
    }

    static async getRestaurantById(restaurantId){
        try {
            const restaurant = await Restaurant.findById(restaurantId).select('_id name address_obj price_level rating review_rating_count features cuisine latitude longitude phone image');
            return restaurant;
        } catch (error) {
            throw new Error('Restaurant not found');
        }

    }

    static async getRestaurantByName(rest_name){
        try {
            // var query = Restaurant.find({ name: rest_name });
            const restaurant = await Restaurant.find({ name: rest_name }).select('_id name price_level rating cuisine image');
            return restaurant;
        } catch (error) {
            throw new Error('Restaurant not found');
        }

    }

}

module.exports = RestaurantModel;