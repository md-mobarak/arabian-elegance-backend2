
import express from 'express';
import { OrderController } from './orderController';
import { authorize, protect } from '../../middlewares/authMiddleware';


const router = express.Router();

// 🟢 Public Routes
router.post('/', OrderController.createOrder);

// Get orders by phone number
router.get('/phone/:phone', OrderController.getOrderByPhone); 
// 🔒 Manager & Admin Routes
// protect, authorize("admin", "manager"),
router.get('/', OrderController.getAllOrders); // Includes Pagination, Filtering, and Search
router.get('/:id', OrderController.getOrderById);
router.put('/:id', OrderController.updateOrder);
router.delete('/:id', OrderController.deleteOrder);


export const OrderRouter=router;





