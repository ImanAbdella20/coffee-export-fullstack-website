import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import productRoute from './routes/productRoute.js';
import cartRoute from './routes/cartRoute.js';
import authRoute from './routes/authRoute.js';


dotenv.config();
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors());

app.use('/products', productRoute)
app.use('/cart', cartRoute);
app.use('/auth', authRoute)





















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