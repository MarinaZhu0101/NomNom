const mongoose = require('mongoose');
const { Schema } = mongoose;

const menuSchema = new Schema({
    _id: Schema.Types.ObjectId,
    restaurant_id: Schema.Types.ObjectId,
    menu_id: Schema.Types.ObjectId,
    raw_text: String,
});

const Menu = mongoose.model('menu', menuSchema);

class MenuModel {

    static async getMenuList(){
        return Menu.find({}, '_id restaurant_id menu_id raw_text')
    }

    static async getMenuById(menuId){
        try {
            const menu = await Menu.findById(menuId).select('_id restaurant_id menu_id raw_text');
            return menu;
        } catch (error) {
            throw new Error('Menu not found');
        }
    }

    static async getMenuByRestaurant(restaurantId){
        try {
            const menu = await Menu.find({ restaurant_id: restaurantId }).select('menu_id raw_text');
            return menu;
        } catch (error) {
            throw new Error('Menu not found');
        }
    }
}

module.exports = MenuModel;