import { PaymentDetail } from "../models/paymentModel.js";

export const addPaymentInfo = async (req, res) => {
  const { cardNumber, expiryDate, cvv, isSavedCard } = req.body;

  if (!cardNumber || !expiryDate || !cvv) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    if (isSavedCard) {
      return res.status(200).json({
        success: true,
        message: "Payment completed successfully!",
        isSavedCard: true
      });
    }

    const paymentDetail = new PaymentDetail({
      cardNumber,
      expiryDate,
      cvv,
      user: req.user._id,
    });

    await paymentDetail.save();
    res.status(200).json({
      success: true,
      message: "Payment completed successfully!",
      paymentDetail
    });
  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(500).json({ 
      success: false,
      message: "There was an error processing the payment.",
      error: error.message 
    });
  }
};

export const processPayment = async (req, res) => {
  const { cardNumber, expiryDate, cvv, isSavedCard } = req.body;

  try {
    if (isSavedCard) {
      const existingCard = await PaymentDetail.findOne({
        cardNumber,
        user: req.user._id
      });
      
      if (!existingCard) {
        return res.status(404).json({ 
          success: false,
          message: "Saved card not found" 
        });
      }
    }
    
    res.status(200).json({
      success: true,
      message: "Payment processed successfully",
      isSavedCard: isSavedCard || false
    });
  } catch (error) {
    console.error("Payment processing error:", error);
    res.status(500).json({ 
      success: false,
      message: "Payment processing failed",
      error: error.message 
    });
  }
};

export const getPayment = async (req, res) => {
  try {
    const userId = req.user._id;
    const paymentDetails = await PaymentDetail.find({ user: userId });

    if (!paymentDetails || paymentDetails.length === 0) {
      return res.status(200).json({ 
        success: true,
        paymentDetails: [] 
      });
    }

    res.status(200).json({ 
      success: true,
      paymentDetails 
    });
  } catch (error) {
    console.error("Error retrieving payment details:", error);
    res.status(500).json({ 
      success: false,
      message: "Error retrieving payment details",
      error: error.message 
    });
  }
};