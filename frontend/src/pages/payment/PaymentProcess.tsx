import React, { useState } from 'react';
import axios from 'axios';

const PaymentForm = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isCardValid, setIsCardValid] = useState(true);
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

  // Handle form submission
   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
 
     const form = e.target as HTMLFormElement;  // Cast to HTMLFormElement
 
     // Collect form data using form elements
     const cardNumber = (form.elements.namedItem('cardNumber') as HTMLInputElement).value;
     const expiryDate = (form.elements.namedItem('expiryDate') as HTMLInputElement).value;
     const cvv = (form.elements.namedItem('cvv') as HTMLInputElement).value;
 
     if (!cardNumber) {
       alert('Card number is required');
       return;
     }
 
     if (!cardNumber || !expiryDate || !cvv ) {
       alert('All fields are required');
       return;
     }
 
     const paymentData = {
       cardNumber,
       expiryDate,
       cvv,
     };
 
     try {
       const response = await axios.post(`${import.meta.env.REACT_APP_API_URL}//add`, paymentData);
       if (response.status === 200) {
         alert('Payment done successfully!');
       }
     } catch (error) {
       console.error('Error in payment process:', error);
       alert('There was an error in payment process.');
     }
   };

  return (
    <div className="h-screen">
      <h2 className="text-center">Payment Form</h2>

      {isPaymentSuccessful ? (
        <div className="payment-success">
          <h3>Payment Successful!</h3>
          <p>Your payment has been processed successfully. Thank you for your purchase!</p>
        </div>
      ) : (
        <form className="payment-form flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="cardNumber">Card Number:</label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            placeholder="Enter your card number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
          />

          <label htmlFor="expiryDate">Expiry Date:</label>
          <input
            type="text"
            id="expiryDate"
            name="expiryDate"
            placeholder="MM/YY"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            required
          />

          <label htmlFor="cvv">CVV:</label>
          <input
            type="text"
            id="cvv"
            name="cvv"
            placeholder="Enter CVV"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            required
          />

          <button type="submit" className="submit-btn">
            Submit Payment
          </button>
        </form>
      )}
    </div>
  );
};

export default PaymentForm;
