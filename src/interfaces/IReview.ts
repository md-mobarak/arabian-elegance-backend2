// src/interfaces/IReview.ts
export interface IReview {
    id: string;
    userId: string; // Reference to user
    productId: string; // Reference to product
    rating: number; // 1 to 5 scale
    comment: string;
  }
  