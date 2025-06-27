"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reviewController_1 = __importDefault(require("./reviewController"));
const router = (0, express_1.Router)();
router.post('/', reviewController_1.default.createReview);
router.get('/:id', reviewController_1.default.getReview);
router.put('/:id', reviewController_1.default.updateReview);
router.delete('/:id', reviewController_1.default.deleteReview);
// Additional routes as needed
exports.default = router;
