"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRouter_1 = require("../user/userRouter");
const orderRouter_1 = require("../order/orderRouter");
const productRouter_1 = require("../product/productRouter");
const categoryRouter_1 = require("../category/categoryRouter");
const rootRoute = express_1.default.Router();
const ModuleRoute = [
    {
        path: '/auth',
        routes: userRouter_1.userRouter
    },
    {
        path: '/order',
        routes: orderRouter_1.OrderRouter
    },
    {
        path: '/product',
        routes: productRouter_1.productRouter
    },
    {
        path: '/category',
        routes: categoryRouter_1.categoryRouter
    },
];
ModuleRoute.forEach(routes => rootRoute.use(routes.path, routes.routes));
exports.default = rootRoute;
