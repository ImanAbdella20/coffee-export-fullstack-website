import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import productRoute from './routes/productRoute.js';
import cartRoute from './routes/cartRoute.js';
import authRoute from './routes/authRoute.js';
import shipRoute from './routes/shippingRoute.js';
import paymentRoute from './routes/paymentRoute.js';
import orderhistoryRoute from './routes/orderHistoryRoute.js';
import contactRoute from './routes/contactRoute.js';


dotenv.config();
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors());

app.use('/products', productRoute)
app.use('/cart', cartRoute);
app.use('/auth', authRoute);
app.use('/shipitems', shipRoute);
app.use('/paymentprocess', paymentRoute);
app.use('/orderhistory', orderhistoryRoute);
app.use('/contact', contactRoute);






















 const connectDB =async () => {
    try {
        await mongoose.connect(process.env.CONNECTION_STRING)
        console.log("Database Connected Successfully!");
    } catch (error) {
        console.log("Database Connection Error", error);
        process.exit(1);
    }
 }

 export {app , connectDB}