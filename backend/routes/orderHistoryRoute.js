import express from 'express';
import { createOrderHistory, getOrderHistory } from '../controller/orderHistoryController.js';
import { validateFirebaseToken } from '../middleware/authMiddleware.js';

const orderhistoryRoute = express.Router();

orderhistoryRoute.post('/create' , validateFirebaseToken,createOrderHistory);
orderhistoryRoute.get('/user' , validateFirebaseToken, getOrderHistory)

export default orderhistoryRoute;