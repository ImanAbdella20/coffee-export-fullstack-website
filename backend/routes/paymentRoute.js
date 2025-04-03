import express from 'express';
import { validateFirebaseToken } from '../middleware/authMiddleware.js';
import { addPaymentInfo, getPayment, processPayment } from '../controller/paymentController.js';

const paymentRoute = express.Router();

paymentRoute.post('/add' ,validateFirebaseToken, addPaymentInfo);
paymentRoute.get('/details' ,validateFirebaseToken, getPayment);
paymentRoute.post('/process' ,validateFirebaseToken, processPayment);

export default paymentRoute;