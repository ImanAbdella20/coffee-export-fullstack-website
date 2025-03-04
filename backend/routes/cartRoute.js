import express from 'express'
import { addToCart } from '../controller/cartController.js';

const cartRoute = express.Router();

cartRoute.post('/add' , addToCart )

export default cartRoute;