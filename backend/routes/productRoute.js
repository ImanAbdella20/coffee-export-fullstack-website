import express from 'express';
import { addProduct, getProduct } from '../controller/productController.js';

const productRoute = express.Router();

productRoute.get('/' , getProduct);
productRoute.post('/add' , addProduct);

export default productRoute;