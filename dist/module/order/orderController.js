"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const orderService_1 = require("./orderService");
// Create a new order
const createOrder = async (req, res, next) => {
    try {
        const order = await orderService_1.OrderService.createOrder(req.body);
        res.status(201).json({ success: true, message: "Order placed successfully", data: order });
    }
    catch (error) {
        next(error);
    }
};
// Get all orders with search, filter, pagination
const getAllOrders = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, search, status, paymentStatus } = req.query;
        const result = await orderService_1.OrderService.getAllOrders(Number(page), Number(limit), search, status, paymentStatus);
        res.status(200).json({ success: true, ...result });
    }
    catch (error) {
        next(error);
    }
};
// Get single order by ID
const getOrderById = async (req, res, next) => {
    try {
        const order = await orderService_1.OrderService.getOrderById(req.params.id);
        if (!order) {
            res.status(404).json({ success: false, message: "Order not found" });
            return;
        }
        res.status(200).json({ success: true, data: order });
    }
    catch (error) {
        next(error);
    }
};
// Get order by phone
const getOrderByPhone = async (req, res, next) => {
    try {
        const order = await orderService_1.OrderService.getOrderByPhone(req.params.phone);
        if (!order) {
            res.status(404).json({ success: false, message: "Order not found" });
            return;
        }
        res.status(200).json({ success: true, data: order });
    }
    catch (error) {
        next(error);
    }
};
// Update order
const updateOrder = async (req, res, next) => {
    try {
        const updatedOrder = await orderService_1.OrderService.updateOrder(req.params.id, req.body);
        if (!updatedOrder) {
            res.status(404).json({ success: false, message: "Order not found" });
            return;
        }
        res.status(200).json({ success: true, message: "Order updated", data: updatedOrder });
    }
    catch (error) {
        next(error);
    }
};
// Delete order
const deleteOrder = async (req, res, next) => {
    try {
        const deletedOrder = await orderService_1.OrderService.deleteOrder(req.params.id);
        if (!deletedOrder) {
            res.status(404).json({ success: false, message: "Order not found" });
            return;
        }
        res.status(200).json({ success: true, message: "Order deleted" });
    }
    catch (error) {
        next(error);
    }
};
exports.OrderController = {
    createOrder,
    getAllOrders,
    getOrderById,
    getOrderByPhone,
    updateOrder,
    deleteOrder,
};
