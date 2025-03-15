import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    cardNumber: { 
        type: String, 
        required: true 
    },
    expiryDate:{ 
        type: String, 
        required: true 
    },
    cvv: { 
        type: String, 
        required: true 
    }
  }, { 
    timestamps: true 
});
  
  // Create a model based on the schema
 export  const ShippingDetails = mongoose.model('ShippingDetails', shippingSchema);