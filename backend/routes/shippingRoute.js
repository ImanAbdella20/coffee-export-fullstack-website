import express from 'express';
import { addShippingDetail, getShippingDetailByUserId, updateShippingDetail } from '../controller/shipController.js';
import {validateFirebaseToken} from '../middleware/authMiddleware.js'

const shipRoute = express.Router();

shipRoute.post('/add' , validateFirebaseToken, addShippingDetail);
shipRoute.get('/details' , validateFirebaseToken, getShippingDetailByUserId);
shipRoute.put('/update', validateFirebaseToken, updateShippingDetail);

export default shipRoute;