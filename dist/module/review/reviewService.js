"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const reviewModel_1 = __importDefault(require("./reviewModel"));
// import { IReview } from '../../interfaces/IReview';
class ReviewService {
    async createReview(data) {
        const review = new reviewModel_1.default(data);
        await review.save();
        return review;
    }
    async getReview(id) {
        const review = await reviewModel_1.default.findById(id).populate('productId').populate('userId');
        if (!review)
            throw new Error('Review not found');
        return review;
    }
    async updateReview(id, data) {
        const review = await reviewModel_1.default.findByIdAndUpdate(id, data, { new: true });
        if (!review)
            throw new Error('Review not found');
        return review;
    }
    async deleteReview(id) {
        await reviewModel_1.default.findByIdAndDelete(id);
    }
    async getAllReviews() {
        return reviewModel_1.default.find().populate('productId').populate('userId');
    }
}
exports.default = new ReviewService();
