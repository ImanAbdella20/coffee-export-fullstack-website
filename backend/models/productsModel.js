import mongoose from 'mongoose';

const productModel = mongoose.Schema({
     name:{
        type:String,
        required:true,
     },
     image: {
        type: String,  // URL to the image or path to the image
        required: true,
      },
      weight: {
        type: String,
        required: true,
      },
      price: {
        type: String,
        required: true,
      },
      type: {
        type: String,  // 'grinded' or 'whole'
        required: true,
      },
      roastLevel: {
        type: String,  // 'light', 'medium', or 'dark'
        required: true,
      },
      origin: {
        type: String, 
        required: true,
      }
})

export const Product = mongoose.model("Product" , productModel);