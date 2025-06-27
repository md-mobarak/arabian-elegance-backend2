import mongoose, { Schema, Document } from 'mongoose';

export interface IReview extends Document {
    productId: mongoose.Schema.Types.ObjectId;
    userId: mongoose.Schema.Types.ObjectId;
    rating: number;
    comment: string;
}

const ReviewSchema = new Schema<IReview>({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
});

export default mongoose.model<IReview>('Review', ReviewSchema);
