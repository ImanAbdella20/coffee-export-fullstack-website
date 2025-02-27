import express from 'express';
import { addProduct, deleteProduct, getProduct, updateProduct } from '../controller/productController.js';

const productRoute = express.Router();

productRoute.get('/' , getProduct);
productRoute.post('/add' , addProduct);
productRoute.put('/update/:id' , updateProduct );
productRoute.delete('/delete/:id' , deleteProduct);

export default productRoute;