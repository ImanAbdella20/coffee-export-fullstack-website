import mongoose from "mongoose";

const shippingSchema = new mongoose.Schema({
    user: {
        type: String,
        ref: "User",
        required: true,
      },
    fullName: { 
        type: String, 
        required: true 
    },
    address: { 
        type: String, 
        required: true 
    },
    city: { 
        type: String, 
        required: true 
    },
    postalCode: { 
        type: String, 
        required: true 
    },
    country: { 
        type: String, 
        required: true 
    },
    phoneNumber: { 
        type: String, 
        required: true 
    },
  }, { 
    timestamps: true 
});
  
  // Create a model based on the schema
 export  const ShippingDetails = mongoose.model('ShippingDetails', shippingSchema);