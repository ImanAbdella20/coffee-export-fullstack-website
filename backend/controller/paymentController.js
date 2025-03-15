import { PaymentDetail } from "../models/paymentModel.js";


export const addPaymentInfo = async(req,res) => {

    const { cardNumber,expiryDate, cvv} = req.body;

    if (!cardNumber || !expiryDate || !cvv ) {
        return res.status(400).json({ message: 'All fields are required' });
      }

 try {

    const existingPaymentDetail  = await PaymentDetail.findOne({user: req.user._id})

    if(existingPaymentDetail){

      return res.status(400).json({ message: 'User already has a Payment detail on file.' });
    }
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