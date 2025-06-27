import express from 'express'
import { userRouter } from '../user/userRouter'
import { OrderRouter } from '../order/orderRouter';
import { productRouter } from '../product/productRouter';
import { categoryRouter } from '../category/categoryRouter';
const rootRoute = express.Router()


const ModuleRoute = [
    {
        path: '/auth',
        routes: userRouter
    },
    {
        path: '/order',
        routes: OrderRouter
    },
    {
        path: '/product',
        routes: productRouter
    },
    {
        path: '/category',
        routes: categoryRouter
    },


]

ModuleRoute.forEach(routes => rootRoute.use(routes.path, routes.routes))
export default rootRoute