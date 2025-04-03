import { PaymentDetail } from "../models/paymentModel.js";

export const addPaymentInfo = async (req, res) => {
  const { cardNumber, expiryDate, cvv, isSavedCard } = req.body;

  if (!cardNumber || !expiryDate || !cvv) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // For saved cards, we don't need to create a new record
    if (isSavedCard) {
      // Process payment with existing card
      return res.status(200).json({
        message: "Payment completed successfully!",
        isSavedCard: true
      });
    }

    // For new cards, save the payment details
    const paymentDetail = new PaymentDetail({
      cardNumber,
      expiryDate,
      cvv,
      user: req.user._id,
    });

    await paymentDetail.save();
    res.status(200).json({
      message: "Payment completed successfully!",
      paymentDetail
    });
  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(500).json({ message: "There was an error processing the payment." });
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
        return res.status(404).json({ message: "Saved card not found" });
      }
    }
    res.status(200).json({
      success: true,
      message: "Payment processed successfully",
      isSavedCard: isSavedCard || false
    })
    
  } catch (error) {
    console.error("Payment processing error:", error);
    res.status(500).json({ message: "Payment processing failed" });
  }
};


export const getPayment = async (req, res) => {
  try {
    const userId = req.user._id;
    const paymentDetails = await PaymentDetail.find({ user: userId });

    res.status(200).json({ paymentDetails: paymentDetails || [] });
  } catch (error) {
    console.error("Error retrieving payment details:", error);
    res.status(500).json({ message: "Error retrieving payment details" });
  }
};