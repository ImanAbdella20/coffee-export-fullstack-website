import { OrderHistory } from "../models/orderHistoryModel.js";

export const createOrderHistory = async (req, res) => {
  try {
    const userId = req.user.uid; // Extracted from Firebase middleware
    const { cartItems, shippingDetails, totalPrice } = req.body;

    const newOrder = new OrderHistory({
      userId,
      cartItems,
      shippingDetails,
      totalPrice,
    });
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).json({ message: "Failed to create order." });
  }
};

export const getOrderHistory = async (req, res) => {
    try {
      const userId = req.user.uid;
      const orders = await OrderHistory.find({ userId }).sort({ createdAt: -1 });
      res.status(200).json({ orders });
    } catch (error) {
      console.error("Error fetching order history:", error);
      res.status(500).json({ message: "Failed to retrieve order history." });
    }
  };
  
