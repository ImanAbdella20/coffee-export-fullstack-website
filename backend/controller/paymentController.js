import { PaymentDetail } from "../models/paymentModel.js";


export const addPaymentInfo = async(req,res) => {

    const { cardNumber,expiryDate, cvv} = req.body;

    if (!cardNumber || !expiryDate || !cvv ) {
        return res.status(400).json({ message: 'All fields are required' });
      }

 try {

    const Paymentdetail = new PaymentDetail ({
        cardNumber,
        expiryDate,
         cvv,
        user:req.user._id
    })

    await Paymentdetail.save();
    res.status(200).json({ message: 'Payment completed successfully!' });
  } catch (error) {
    console.error('Error saving Payment details:', error);
    res.status(500).json({ message: 'There was an error saving the Payment details.' });
  }      
}

export const getPayment = async(req,res) => {
console.log('get payment');

   try {
      const userId = req.user._id;
      console.log('USERID FOUND');
  
      // Find the shipping details for the logged-in user
      const paymentDetails = await PaymentDetail.find({ user: userId });
  
      if (!paymentDetails || paymentDetails.length === 0) {
        return res.status(404).json({ message: 'No payment details found for this user' });
      }
  
      // Return the shipping details in the response
      res.status(200).json({ paymentDetails });
      console.log('PAYMENTDETAIL' , paymentDetails);
    } catch (error) {
      console.error('Error retrieving payment details:', error);
      res.status(500).json({ message: 'There was an error retrieving the payment details.' });
    }
}