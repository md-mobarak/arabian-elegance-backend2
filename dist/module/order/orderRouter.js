"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRouter = void 0;
const express_1 = __importDefault(require("express"));
const orderController_1 = require("./orderController");
const router = express_1.default.Router();
// 🟢 Public Routes
router.post('/', orderController_1.OrderController.createOrder);
// Get orders by phone number
router.get('/phone/:phone', orderController_1.OrderController.getOrderByPhone);
// 🔒 Manager & Admin Routes
// protect, authorize("admin", "manager"),
router.get('/', orderController_1.OrderController.getAllOrders); // Includes Pagination, Filtering, and Search
router.get('/:id', orderController_1.OrderController.getOrderById);
router.put('/:id', orderController_1.OrderController.updateOrder);
router.delete('/:id', orderController_1.OrderController.deleteOrder);
exports.OrderRouter = router;
