import { Request, Response, NextFunction } from 'express';
import reviewService from './reviewService';

class ReviewController {
    async createReview(req: Request, res: Response, next: NextFunction) {
        try {
            const review = await reviewService.createReview(req.body);
            res.status(201).json(review);
        } catch (error) {
            next(error);
        }
    }

    async getReview(req: Request, res: Response, next: NextFunction) {
        try {
            const review = await reviewService.getReview(req.params.id);
            res.json(review);
        } catch (error) {
            next(error);
        }
    }

    async updateReview(req: Request, res: Response, next: NextFunction) {
        try {
            const review = await reviewService.updateReview(req.params.id, req.body);
            res.json(review);
        } catch (error) {
            next(error);
        }
    }

    async deleteReview(req: Request, res: Response, next: NextFunction) {
        try {
            await reviewService.deleteReview(req.params.id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }

    // Additional methods as needed
}

export default new ReviewController();
