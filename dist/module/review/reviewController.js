"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const reviewService_1 = __importDefault(require("./reviewService"));
class ReviewController {
    async createReview(req, res, next) {
        try {
            const review = await reviewService_1.default.createReview(req.body);
            res.status(201).json(review);
        }
        catch (error) {
            next(error);
        }
    }
    async getReview(req, res, next) {
        try {
            const review = await reviewService_1.default.getReview(req.params.id);
            res.json(review);
        }
        catch (error) {
            next(error);
        }
    }
    async updateReview(req, res, next) {
        try {
            const review = await reviewService_1.default.updateReview(req.params.id, req.body);
            res.json(review);
        }
        catch (error) {
            next(error);
        }
    }
    async deleteReview(req, res, next) {
        try {
            await reviewService_1.default.deleteReview(req.params.id);
            res.status(204).send();
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = new ReviewController();
