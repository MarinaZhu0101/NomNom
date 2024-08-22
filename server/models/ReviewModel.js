const mongoose = require('mongoose');
// const { description } = require('../../client/screens/MenuDetails');
const { Schema } = mongoose;

const reviewSchema = new Schema({
    _id: Schema.Types.ObjectId,
    user_id: Schema.Types.ObjectId,
    rating: String,
    text: String,
    review_date: Date,
    restaurant_id: Schema.Types.ObjectId,
    features: [String],
    photos: [String],
    helpful: [String],
    rating_details: [{
        taste: String,
        authenticity: String,
        ambience: String,
    }],
});

const Review = mongoose.model('review', reviewSchema);

class ReviewModel {

    static async getReviewList(){
        return Review.find({}, '_id user_id rating restaurant_id text review_date features photos helpful rating_details ')
    }

    static async getReviewById(restaurantId){
        try {
            // console.log("ReviewModel - reviewId: ", reviewId);
            const review = await Review.find({ restaurant_id: restaurantId }).select('_id user_id rating restaurant_id text review_date features photos helpful rating_details ');
            // const review = await Review.findById(reviewId).select('_id user_id rating restaurant_id text review_date features photos helpful rating_details ');
            return review;
        } catch (error) {
            throw new Error('Review not found');
        }
        
    }

    static async createReview(reviewData) {
        const newReview = new Review({
            _id: new mongoose.Types.ObjectId(),
            ...reviewData,
            review_date: new Date(),
        });

        try {
            const savedReview = await newReview.save();
            return savedReview;
        } catch (error) {
            throw new Error('Error creating review');
        }
    }

    static async getReviewByUserId(userId){
        try {
            const reviews = await Review.find({ user_id: userId }).select('_id user_id rating restaurant_id text review_date features photos helpful rating_details ');
            return Array.isArray(reviews) ? reviews : [reviews];
        } catch (error) {
            throw new Error('Reviews not found for the specified user');
        }
    }


}

module.exports = ReviewModel;