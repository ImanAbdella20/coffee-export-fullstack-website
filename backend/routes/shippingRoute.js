import express from 'express';
import { addShippingDetail } from '../controller/shipController.js';

const shipRoute = express.Router();

shipRoute.post('/add' , addShippingDetail);
shipRoute.put('/update',);

export default shipRoute;