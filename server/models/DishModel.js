const mongoose = require('mongoose');
const { Schema } = mongoose;

const dishSchema = new Schema({
    // _id: Schema.Types.ObjectId,
    menu_id: Schema.Types.ObjectId,
    name: String,
    description: String,
    category: String,
    price: Number,
    note: String,
    rating: String
}, {versionKey: false});

const Dish = mongoose.model('dish', dishSchema);

class DishModel {

    static async getDishList(){
        return Dish.find({}, '_id menu_id name description category price note rating')
    }

    static async getDishById(dishId){
        try {
            const dish = await Dish.findById(dishId).select('_id menu_id name description category price note rating');
            return dish;
        } catch (error) {
            throw new Error('Dish not found');
        }
    }

    static async getDishesByMenu(menuId){
        try {
            const dishes = await Dish.find({menu_id: menuId}).select('name description category price note rating');
            return dishes;
        } catch (error) {
            throw new Error('Dish not found');
        }
    }

    static async addDishes(menu_id, dishes){
        console.log("File DishModel - dishes: ", dishes);
        // const dish = new Dish(dishes);
        const result = await Dish.deleteMany({ menu_id: menu_id });
        return Dish.insertMany(dishes);
    }
}

module.exports = DishModel;