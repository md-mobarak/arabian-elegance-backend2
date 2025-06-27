
import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
    name: string;
    email?: string;
    products: { // ✅ Keep only this array
        product: mongoose.Schema.Types.ObjectId;
        quantity: number;
        price: number;
    }[];
    phone: number;
    district: string;
    thana: string;
    village: string;
    streetAddress: string;
    status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
    additionalInformation?: string;
    totalAmount: number;
    paymentStatus: 'paid' | 'unpaid';
    orderDate: Date;
    updatedAt?: Date;
}

const OrderSchema = new Schema<IOrder>(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, trim: true },
        products: [{
            product: { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Product', 
                required: true 
            },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true }
        }],
        phone: { type: Number, required: true },
        district: { type: String, required: true, trim: true },
        thana: { type: String, required: true, trim: true },
        village: { type: String, required: true, trim: true },
        streetAddress: { type: String, required: true, trim: true },
        status: { 
            type: String, 
            enum: ['pending', 'shipped', 'delivered', 'cancelled'], 
            default: 'pending' 
        },
        additionalInformation: { type: String, trim: true },
        totalAmount: { type: Number, required: true },
        paymentStatus: { 
            type: String, 
            enum: ['paid', 'unpaid'], 
            default: 'unpaid' 
        },
        orderDate: { type: Date, default: Date.now }
    },
    { timestamps: true }
);

export default mongoose.model<IOrder>('Order', OrderSchema);