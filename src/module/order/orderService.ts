

import OrderModel, { IOrder } from "./orderModel";

// Create a new order
const createOrder = async (data: IOrder) => {
  return await OrderModel.create(data);
};


// Get all orders with search, filter, and pagination
const getAllOrders = async (
  page: number,
  limit: number,
  search?: string,
  status?: string,
  paymentStatus?: string
) => {
  const query: any = {};

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { phone: { $regex: search, $options: "i" } },
    ];
  }

  if (status) query.status = status;
  if (paymentStatus) query.paymentStatus = paymentStatus;

  const orders = await OrderModel.find(query)
    .populate({
      path: 'products.product',
      select: 'title price images category', // Add/remove fields as needed
      populate: {
        path: 'category',
        select: 'name' // Populate category name if needed
      }
    })
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ orderDate: -1 });

  const totalOrders = await OrderModel.countDocuments(query);

  return { 
    orders, 
    page, 
    limit, 
    totalOrders, 
    totalPages: Math.ceil(totalOrders / limit) 
  };
};

// Get single order by ID with proper population
const getOrderById = async (id: string) => {
  try {
    const order = await OrderModel.findById(id)
      .populate({
        path: 'products.product',
        model: 'Product', // Explicitly specify the model
        select: 'title price images category',
        populate: {
          path: 'category',
          model: 'Category', // Explicitly specify the category model
          select: 'name'
        }
      })
      .lean();

   
    return order;
  } catch (error) {
    console.error('Error fetching order:', error);
    throw new Error('Failed to fetch order details');
  }
};

// Get order by phone
const getOrderByPhone = async (phone: string) => {
  return await OrderModel.find({ phone }).sort({ orderDate: -1 });
};

// Update order
const updateOrder = async (id: string, data: Partial<IOrder>) => {
  return await OrderModel.findByIdAndUpdate(id, data, { new: true });
};

// Delete order
const deleteOrder = async (id: string) => {
  return await OrderModel.findByIdAndDelete(id);
};

export const OrderService = {
  createOrder,
  getAllOrders,
  getOrderById,
  getOrderByPhone,
  updateOrder,
  deleteOrder,
};
