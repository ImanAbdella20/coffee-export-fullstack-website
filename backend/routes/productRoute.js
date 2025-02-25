import express from 'express';
import { addProduct } from '../controller/productController.js';

const productRoute = express.Router();

productRoute.post('/add' , addProduct);

export default productRoute;