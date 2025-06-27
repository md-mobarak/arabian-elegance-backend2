// import mongoose from "mongoose";

// // Interface for Product
// export interface IProduct {
//   title: string;
//   description: string;
//   category: mongoose.Schema.Types.ObjectId;
//   price: number;
//   stock: number;
//   brand?: string;
//   images: string[];
//   sizes?: string[];
//   colors?: string[];
//   tags?:string;
//   reviews: mongoose.Types.ObjectId; // Reference to Review Model
//   createdAt: Date;
//   updatedAt: Date;
// }
// // images: [{ type: String }], // Array of image URLs
// // sizes: [{ type: String, enum: ["S", "M", "L", "XL", "XXL"] }], // Available sizes
// // tags: [{ type: String }], // Tags like "Panjabi", "Tencel"

import mongoose, { Document } from "mongoose";

// Interface for Product
export interface IProduct extends Document {
  title: string;
  description: string;
  category: mongoose.Schema.Types.ObjectId;
  price: number;
  stock: number;
  brand?: string;
  images: string[];
  sizes?: string[];
  colors?: string[];
  tags?: string[];
  reviews: mongoose.Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}
