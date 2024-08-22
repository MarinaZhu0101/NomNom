const ReviewModel = require('../models/ReviewModel');

class ReviewController {

    static async getReviewList(req, res) {
        try{
            const reviewList = await ReviewModel.getReviewList();
            res.status(200).json(reviewList);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    };

    static async getReviewById(req, res) {
        const reviewId = req.params.restaurant_id;
        console.log("ReviewController - reviewId: ", reviewId);
        try {
            const review = await ReviewModel.getReviewById(reviewId);
            if (review) {
                res.json(review);
            } else {
                res.status(404).json({ message: 'Review not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async createReview(req, res) {
        try {
            const userId = req.user._id;
            const { rating, text, restaurant_id, features, photos, rating_details } = req.body;

            const newReview = await ReviewModel.createReview({
                user_id: userId,
                rating,
                text,
                restaurant_id,
                features,
                photos,
                rating_details
            });

            res.status(201).json(newReview);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async getReviewByUserId(req, res) {
        const userId = req.params.user_id;
        try {
            const reviews = await ReviewModel.getReviewByUserId(userId);
            if (reviews && reviews.length > 0) {
                res.status(200).json(reviews);
            } else {
                res.status(404).json({ message: 'No reviews found for this user' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

}

module.exports = ReviewController;