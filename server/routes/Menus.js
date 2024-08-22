const express = require('express');
const router = express.Router();
const MenuController = require('../controllers/MenuController');

router.get("/", MenuController.getMenuList);
router.get("/:id", MenuController.getMenuById);
router.get('/restaurantId/:restaurant_id', MenuController.getMenuByRestaurant);

module.exports = router;