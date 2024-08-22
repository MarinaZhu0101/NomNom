const express = require('express');
const router = express.Router();
const RestaurantController = require('../controllers/RestaurantController');

router.get("/", RestaurantController.getRestaurantList);
router.get("/:id", RestaurantController.getRestaurantById);
// router.get("/:name", RestaurantController.getRestaurantByName);
// router.get('/restaurants', RestaurantController.getRestaurantByName);
router.get('/name/:name', RestaurantController.getRestaurantByName);
module.exports = router;