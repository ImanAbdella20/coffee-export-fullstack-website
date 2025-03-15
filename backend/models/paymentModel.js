import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    user: {
        type: String,
        ref: "User",
        required: true,
      },
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
 export  const PaymentDetail = mongoose.model('PaymentDetail', paymentSchema);