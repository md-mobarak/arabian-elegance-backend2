import mongoose, { Schema } from "mongoose";
import { IProduct } from "../../interfaces/IProduct";

// Product Schema
const ProductSchema: Schema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category",},
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0 },
    brand: { type: String, trim: true },
    images: { type: [String], required: true }, // Array of image URLs
    sizes: [{ type: String, enum: ["S", "M", "L", "XL", "XXL",28,30,32,34,36,38,40,42,44] }], // Available sizes
    colors: { type: [String], default: [] }, // Optional colors
    tags: [{ type: String }], // Tags like "Panjabi", "Tencel"
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }], // Relationship with Review Model
  },
  { timestamps: true }
);

// Create and export the Product model
const Product = mongoose.model<IProduct>("Product", ProductSchema);
export default Product;
