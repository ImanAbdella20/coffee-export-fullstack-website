import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
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
    },

  }, { 
    timestamps: true 
});
  
// Add index for faster queries
paymentSchema.index({ user: 1, cardNumber: 1 }, { unique: true });

  // Create a model based on the schema
 export  const PaymentDetail = mongoose.model('PaymentDetail', paymentSchema);