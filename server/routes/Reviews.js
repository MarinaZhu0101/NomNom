const express = require('express');
const router = express.Router();
const ReviewController = require('../controllers/ReviewController');
const validateToken = require('../middlewares/Authmiddleware');

router.get("/", ReviewController.getReviewList);
// router.get("/:id", ReviewController.getReviewById);
router.get('/restaurant/:restaurant_id', ReviewController.getReviewById);

// router.get("/:name", RestaurantController.getRestaurantByName);
// router.get('/restaurants', RestaurantController.getRestaurantByName);

router.post('/restaurant/:restaurant_id', validateToken, ReviewController.createReview);
router.get('/user/:user_id', ReviewController.getReviewByUserId);

module.exports = router;