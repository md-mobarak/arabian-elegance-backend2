import Review, { IReview } from './reviewModel';
// import { IReview } from '../../interfaces/IReview';

class ReviewService {
    async createReview(data: IReview) {
        const review = new Review(data);
        await review.save();
        return review;
    }

    async getReview(id: string) {
        const review = await Review.findById(id).populate('productId').populate('userId');
        if (!review) throw new Error('Review not found');
        return review;
    }

    async updateReview(id: string, data: Partial<IReview>) {
        const review = await Review.findByIdAndUpdate(id, data, { new: true });
        if (!review) throw new Error('Review not found');
        return review;
    }

    async deleteReview(id: string) {
        await Review.findByIdAndDelete(id);
    }

    async getAllReviews() {
        return Review.find().populate('productId').populate('userId');
    }

    // Additional service methods as needed
}

export default new ReviewService();
