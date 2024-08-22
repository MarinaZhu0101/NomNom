const express = require('express');
const router = express.Router();
const DishController = require('../controllers/DishController');

router.get("/menuId/:menu_id", DishController.getDishesByMenu);
router.get("/:id", DishController.getDishById);
router.post("/add-menu", DishController.addDishes);
router.get("/", DishController.getDishList);

module.exports = router;