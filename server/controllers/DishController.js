const DishModel = require('../models/DishModel');

class DishController {

    static async getDishList(req, res) {
        try{
            const dishList = await DishModel.getDishList();
            res.status(200).json(dishList);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    };

    static async getDishById(req, res) {
        const dishId = req.params.id;
        try {
            const dish = await DishModel.getDishById(dishId);
            if (dish) {
                res.json(dish);
            } else {
                res.status(404).json({ message: 'Dish not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async getDishesByMenu(req, res) {
        const menuId = req.params.menu_id;
        try {
            const dishes = await DishModel.getDishesByMenu(menuId);
            if (dishes) {
                res.json(dishes);
            } else {
                res.status(404).json({ message: 'Dish not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    static async addDishes(req, res) {
        try {
            // console.log("Doing something...");
            // const result = await DishModel.insertMany(req.body);

            // const testData = [{ category: "SASHIMI 刺身", description: "(Lean bluefin tuna)", menu_id: "1A", name: "Akami - 4 pieces", note: "", price: 19.95 }, { category: "SASHIMI 刺身", description: "(Bluefin tuna belly)", menu_id: "2B", name: "Otoro - 3 pieces", note: "", price: 14.5 }]
            // const oneDish = { category: "SASHIMI 刺身", description: "(Lean bluefin tuna)", menu_id: "1A", name: "Akami - 4 pieces", note: "", price: 19.95 };
            // console.log("body: ", req.body);
            // console.log("File DishController - dishes: ", oneDish);
            const { menu_id, dishes } = req.body;
            const result = await DishModel.addDishes(menu_id, dishes);
            console.log("Successfully added items!");
            res.status(200).json({message: 'Dishes uploaded successfully'});
        } catch (error) {
            console.error('Error uploading dishes: ', error);
            res.status(500).json({message: 'Internal Server Error'});
        }
    };
}

module.exports = DishController;