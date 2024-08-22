const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const validateToken = require('../middlewares/Authmiddleware');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/resetpassword', UserController.resetPassword);
router.get('/user/:userId', UserController.getUserById);
router.post('/user/:userId/favourites/restaurant', validateToken, UserController.toggleLikeRestaurant);
router.post('/user/:userId/favourites/dish', validateToken, UserController.toggleLikeDish);

module.exports = router;