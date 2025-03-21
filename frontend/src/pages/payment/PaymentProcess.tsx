import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const PaymentForm = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isCardValid, setIsCardValid] = useState(true);
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  const [shippingDetails, setShippingDetails] = useState(null);  // Track existing shipping details
  const navigate = useNavigate();

  // Fetch existing shipping details (if any)
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('You need to be logged in to make a payment.');
      navigate('/login');  // Redirect to login if no token
      return;
    }

    const fetchShippingDetails = async () => {
      try {
        const response = await axios.get(`${import.meta.env.REACT_APP_API_URL}/shipitems/details`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setShippingDetails(response.data);
        } else {
          alert('Shipping details not found. Please update your shipping information.');
        }
      } catch (error) {
        console.error('Error fetching shipping details:', error);
        alert('Failed to fetch shipping details.');
      }
    };

    fetchShippingDetails();
  }, [navigate]);

  // Handle form submission for payment
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
      shippingDetails, // Attach shipping details to payment
    };

    try {
      const token = localStorage.getItem('authToken');  // Assuming token is stored in localStorage
      if (!token) {
        alert('You need to be logged in to make a payment.');
        return;
      }

      const response = await axios.post(`${import.meta.env.REACT_APP_API_URL}/paymentprocess/add`, paymentData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        alert('Payment done successfully!');
        setIsPaymentSuccessful(true);
      }
    } catch (error) {
      console.error('Error in payment process:', error);
      alert('There was an error in the payment process.');
    }
  };

  return (
    <div className="h-screen">
      <h2 className="text-center">Payment Form</h2>

      {/* Update Shipping Details Button */}
      <Link to='/shippingform' state={{ isUpdate: !!shippingDetails }}>
        <button className='absolute right-0 cursor-pointer'>
          {shippingDetails ? 'Update Shipping Detail' : 'Add Shipping Detail'}
        </button>
      </Link>

      {/* Payment form */}
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
