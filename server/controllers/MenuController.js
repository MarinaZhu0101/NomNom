const MenuModel = require('../models/MenuModel');

class MenuController {

    static async getMenuList(req, res) {
        try{
            const menuList = await MenuModel.getMenuList();
            res.status(200).json(menuList);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    };

    static async getMenuById(req, res) {
        const menuId = req.params.id;
        try {
            const menu = await MenuModel.getMenuById(menuId);
            if (menu) {
                res.json(menu);
            } else {
                res.status(404).json({ message: 'Menu not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async getMenuByRestaurant(req, res) {
        const restaurantId = req.params.restaurant_id;
        try {
            const menu = await MenuModel.getMenuByRestaurant(restaurantId);
            if (menu) {
                res.json(menu);
            } else {
                res.status(404).json({ message: 'Menu not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = MenuController;