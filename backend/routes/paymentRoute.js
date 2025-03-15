import express from 'express';
import { validateFirebaseToken } from '../middleware/authMiddleware.js';
import { addPaymentInfo } from '../controller/paymentController.js';

const paymentRoute = express.Router();

paymentRoute.post('/add' ,validateFirebaseToken, addPaymentInfo)

export default paymentRoute;