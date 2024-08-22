const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile_image: { type: String },
    ethnicity: { type: String },
    dietary_restrictions: { type: String },
    dining_preferences: { type: [String], default: [] },
    points: { type: Number, default: 0 },
    notification_settings: { type: Object, default: {} },
    favourite_restaurant: { type: [String], default: [] },
    favourite_dish: { type: [String], default: [] }
});

const User = mongoose.model('User', userSchema);

class UserModel {
    static async register(username, email, password, ethnicity, dietary_restrictions, dining_preferences ){
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            ethnicity,
            dietary_restrictions,
            dining_preferences
        });

        try {
            await newUser.save();
            return newUser._id;
        } catch (error) {
            console.error("Error in register:", error);
            throw error;
        }
    }

    static async login(email, password) {
        try {
            const user = await User.findOne({ email });
            if (user && await bcrypt.compare(password, user.password)) {
                return user;
            } else {
                throw new Error('Invalid email or password');
            }
        } catch (error) {
            console.error("Error in login:", error);
            throw error;
        }
    }

    static async resetPassword(email, newPassword) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        try {
            const user = await User.findOne({ email });
            if (user) {
                user.password = hashedPassword;
                await user.save();
                return true;
            } else {
                throw new Error('User not found');
            }
        } catch (error) {
            console.error("Error in resetPassword:", error);
            throw error;
        }
    }

    static async getUserById(userId) {
        try {
            const user = await User.findById(userId).select('username profile_image');
            if (user) {
                return user;
            } else {
                throw new Error('User not found');
            }
        } catch (error) {
            console.error("Error in getUserById:", error);
            throw error;
        }
    }


    static async toggleLikeRestaurant(userId, restaurantId, action) {
        // console.log(`UserModel.toggleLikeRestaurant called with userId: ${userId}, restaurantId: ${restaurantId}, action: ${action}`);
        try {
            const user = await User.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }

            // console.log(`User found: ${userId}. Current favourite_restaurant:`, user.favourite_restaurant);

            if (action === 'add') {
                if (!user.favourite_restaurant.includes(restaurantId)) {
                    user.favourite_restaurant.push(restaurantId);
                } else {
                    throw new Error('Restaurant already in favourites');
                }
            } else if (action === 'remove') {
                const index = user.favourite_restaurant.indexOf(restaurantId);
                if (index !== -1) {
                    user.favourite_restaurant.splice(index, 1);
                } else {
                    throw new Error('Restaurant not found in favourites');
                }
            } else {
                throw new Error('Invalid action');
            }

            await user.save();
            return user;
        } catch (error) {
            console.error("Error in updateFavouriteRestaurant:", error);
            throw error;
        }
    }

    static async toggleLikeDish(userId, dishId, action) {
        try {
            const user = await User.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }

            if (action === 'add') {
                if (!user.favourite_dish.includes(dishId)) {
                    user.favourite_dish.push(dishId);
                } else {
                    throw new Error('Dish already in favourites');
                }
            } else if (action === 'remove') {
                const index = user.favourite_dish.indexOf(dishId);
                if (index !== -1) {
                    user.favourite_dish.splice(index, 1);
                } else {
                    throw new Error('Dish not found in favourites');
                }
            } else {
                throw new Error('Invalid action');
            }

            await user.save();
            return user;
        } catch (error) {
            console.error("Error in updateFavouriteDish:", error);
            throw error;
        }
    }


}

module.exports = UserModel;