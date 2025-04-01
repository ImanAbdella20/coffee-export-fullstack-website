import express from 'express';
import { validateFirebaseToken } from '../middleware/authMiddleware.js';
import { addPaymentInfo, getPayment } from '../controller/paymentController.js';

const paymentRoute = express.Router();

paymentRoute.post('/add' ,validateFirebaseToken, addPaymentInfo);
paymentRoute.get('/details' ,validateFirebaseToken, getPayment);

export default paymentRoute;