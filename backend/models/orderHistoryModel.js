import mongoose from "mongoose";

const orderHistorySchema = new mongoose.Schema({
  userId: { type: String, required: true },
  cartItems: [
    {
      productId: String,
      name: String,
      quantity: Number,
      price: Number,
    }
  ],
  shippingDetails: {
    fullName: String,
    address: String,
    city: String,
    postalCode: String,
    country: String,
  },
  totalPrice: { type: Number, required: true },
}, { timestamps: true });

export const OrderHistory = mongoose.model('OrderHistory', orderHistorySchema);
