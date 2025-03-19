import express from 'express';
import { addSubscription } from '../controller/subscriptionController.js';

const subscriptionRoute = express.Router();

subscriptionRoute.post('/add' , addSubscription);

export default subscriptionRoute;