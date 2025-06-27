// // src/interfaces/ICategory.ts
// export interface ICategory {
//     name: string;
//     slug: string; // For URL-friendly category names
//   }
import { Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
  slug: string;
  description?: string;
  images?: string[];
  parentCategory?: ICategory["_id"];
  createdAt: Date;
}