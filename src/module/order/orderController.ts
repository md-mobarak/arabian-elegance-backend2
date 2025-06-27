


import { Request, Response, NextFunction } from "express";
import { OrderService } from "./orderService";


// Create a new order
const createOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const order = await OrderService.createOrder(req.body);
    res.status(201).json({ success: true, message: "Order placed successfully", data: order });
  } catch (error) {
    next(error);
  }
};

// Get all orders with search, filter, pagination
const getAllOrders = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { page = 1, limit = 10, search, status, paymentStatus } = req.query;
    const result = await OrderService.getAllOrders(
      Number(page),
      Number(limit),
      search as string,
      status as string,
      paymentStatus as string
    );
    res.status(200).json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
};

// Get single order by ID
const getOrderById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const order = await OrderService.getOrderById(req.params.id);
    if (!order) {
      res.status(404).json({ success: false, message: "Order not found" });
      return;
    }
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

// Get order by phone
const getOrderByPhone = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const order = await OrderService.getOrderByPhone(req.params.phone);
    if (!order) {
      res.status(404).json({ success: false, message: "Order not found" });
      return;
    }
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

// Update order
const updateOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const updatedOrder = await OrderService.updateOrder(req.params.id, req.body);
    if (!updatedOrder) {
      res.status(404).json({ success: false, message: "Order not found" });
      return;
    }
    res.status(200).json({ success: true, message: "Order updated", data: updatedOrder });
  } catch (error) {
    next(error);
  }
};

// Delete order
const deleteOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const deletedOrder = await OrderService.deleteOrder(req.params.id);
    if (!deletedOrder) {
      res.status(404).json({ success: false, message: "Order not found" });
      return;
    }
    res.status(200).json({ success: true, message: "Order deleted" });
  } catch (error) {
    next(error);
  }
};

export const OrderController = {
  createOrder,
  getAllOrders,
  getOrderById,
  getOrderByPhone,
  updateOrder,
  deleteOrder,
};
