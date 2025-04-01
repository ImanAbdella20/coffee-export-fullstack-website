import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

interface PaymentDetail {
  _id: string;
  user: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const PaymentForm = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isCardValid, setIsCardValid] = useState(true);
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  const [shippingDetails, setShippingDetails] = useState(null);
  const [savedPayments, setSavedPayments] = useState<PaymentDetail[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      const user = getAuth().currentUser;
      if (!user) {
        window.location.href = '/login';
        return;
      }
      
      const idToken = await user.getIdToken();
      try {
        // Fetch shipping details
        const shippingResponse = await axios.get(
          `${import.meta.env.REACT_APP_API_URL}/shipitems/details`,
          {
            headers: { Authorization: `Bearer ${idToken}` }
          }
        );

        if (shippingResponse.status === 200) {
          setShippingDetails(shippingResponse.data);
        }

        // Fetch saved payment details
        const paymentResponse = await axios.get(
          `${import.meta.env.REACT_APP_API_URL}/paymentprocess/details`,
          {
            headers: { Authorization: `Bearer ${idToken}` }
          }
        );

        // Handle both array response and object with paymentDetails property
        const paymentData = Array.isArray(paymentResponse.data) 
          ? paymentResponse.data 
          : paymentResponse.data?.paymentDetails || [];

        setSavedPayments(paymentData);
        
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Error fetching details:', error.response?.data);
          if (error.response?.status === 401) {
            navigate('/login');
          }
        } else {
          console.error('Unexpected error:', error);
        }
      }
    };

    fetchDetails();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cardNumber || !expiryDate || !cvv) {
      alert('All fields are required');
      return;
    }

    const paymentData = {
      cardNumber,
      expiryDate,
      cvv,
      shippingDetails,
    };

    try {
      const user = getAuth().currentUser;
      if (!user) {
        alert('You need to be logged in to make a payment.');
        return;
      }

      const idToken = await user.getIdToken();
      
      const response = await axios.post(
        `${import.meta.env.REACT_APP_API_URL}/paymentprocess/add`,
        paymentData,
        {
          headers: { Authorization: `Bearer ${idToken}` }
        }
      );

      if (response.status === 200) {
        alert('Payment done successfully!')
        setIsPaymentSuccessful(true);
        // Refresh the payment details after successful submission
        const paymentResponse = await axios.get(
          `${import.meta.env.REACT_APP_API_URL}/paymentprocess/details`,
          {
            headers: { Authorization: `Bearer ${idToken}` }
          }
        );
        
        // Fix: Update saved payments with new data
        const updatedPaymentData = Array.isArray(paymentResponse.data) 
          ? paymentResponse.data 
          : paymentResponse.data?.paymentDetails || [];
        setSavedPayments(updatedPaymentData);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Payment error:', error.response?.data);
        alert(error.response?.data?.message || 'Payment failed. Please try again.');
      } else {
        console.error('Unexpected error:', error);
        alert('There was an unexpected error in the payment process.');
      }
    }
  };

  // Helper function to use saved card
  const useSavedCard = (payment: PaymentDetail) => {
    setCardNumber(payment.cardNumber);
    setExpiryDate(payment.expiryDate);
    setCvv(payment.cvv);
  };

  return (
    <div className="h-screen">
      <h2 className="text-center">Payment Form</h2>

      {/* Display saved payment details */}
      {savedPayments.length > 0 ? (
        <div className="saved-card-info">
          <h2>Your Saved Payment Methods:</h2>
          {savedPayments.map((payment, index) => (
            <div key={payment._id} className="mb-2">

                <h6>Card {index + 1}: **** **** **** {payment.cardNumber.slice(-4)}</h6>
                <button 
                className='bg-amber-800 cursor-pointer'
                > pay now</button>
            
            </div>
          ))}
        </div>
      ) : (
        <p>No saved cards found</p>
      )}

      <h2>Add shipping form</h2>

      <Link to='/shippingform' state={{ isUpdate: !!shippingDetails }}>
        <button className='absolute right-0 cursor-pointer'>
          {shippingDetails ? 'Update Shipping Detail' : 'Add Shipping Detail'}
        </button>
      </Link>

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