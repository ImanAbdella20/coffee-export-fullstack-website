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
        const shippingResponse = await axios.get(
          `${import.meta.env.REACT_APP_API_URL}/shipitems/details`,
          { headers: { Authorization: `Bearer ${idToken}` } }
        );

        if (shippingResponse.status === 200) {
          setShippingDetails(shippingResponse.data);
        }

        const paymentResponse = await axios.get(
          `${import.meta.env.REACT_APP_API_URL}/paymentprocess/details`,
          { headers: { Authorization: `Bearer ${idToken}` } }
        );

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

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(e.target.value);
    setCardNumber(formattedValue);
    setIsCardValid(formattedValue.replace(/\s/g, '').length === 16);
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/[^0-9]/g, '');
    if (v.length >= 3) {
      return `${v.slice(0, 2)}/${v.slice(2, 4)}`;
    }
    return value;
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatExpiryDate(e.target.value);
    setExpiryDate(formattedValue);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cardNumber || !expiryDate || !cvv) {
      alert('All fields are required');
      return;
    }

    const paymentData = {
      cardNumber: cardNumber.replace(/\s/g, ''),
      expiryDate,
      cvv,
      isSavedCard: false,
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
        { headers: { Authorization: `Bearer ${idToken}` } }
      );

      if (response.status === 200) {
        setIsPaymentSuccessful(true);

        const paymentResponse = await axios.get(
          `${import.meta.env.REACT_APP_API_URL}/paymentprocess/details`,
          { headers: { Authorization: `Bearer ${idToken}` } }
        );
        
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

  const handleSavedCardPayment = async (payment: PaymentDetail) => {
    try {
      const user = getAuth().currentUser;
      if (!user) {
        alert('You need to be logged in to make a payment.');
        return;
      }
  
      const idToken = await user.getIdToken();
      
      const paymentData = {
        cardNumber: payment.cardNumber,
        expiryDate: payment.expiryDate,
        cvv: payment.cvv,
        isSavedCard: true,
        shippingDetails,
      };
  
      const response = await axios.post(
        `${import.meta.env.REACT_APP_API_URL}/paymentprocess/process`,
        paymentData,
        { headers: { Authorization: `Bearer ${idToken}` } }
      );
  
      if (response.data.success) {
        setIsPaymentSuccessful(true);
        
        setSavedPayments(prev => prev.map(p => 
          p._id === payment._id ? { ...p, lastUsed: new Date().toISOString() } : p
        ));
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

  const useSavedCard = (payment: PaymentDetail) => {
    setCardNumber(payment.cardNumber);
    setExpiryDate(payment.expiryDate);
    setCvv(payment.cvv);
  };

  const successMessage = () => {
    setIsPaymentSuccessful(false);
    navigate('/itempayment' , {state: {fromPayment:true}});
  };

  const getPaidItemName = () => {
    const item = localStorage.getItem('currentPaymentItem');
    return item ? JSON.parse(item).name : 'your item';
  };

  if (isPaymentSuccessful) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full text-center animate-fade-in">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
          <p className="text-gray-600 mb-6">Your payment for <span className="font-semibold">{getPaidItemName()}</span> has been processed successfully.</p>
          <button 
            onClick={successMessage}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center relative bottom-20">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="payH1 text-3xl font-extrabold text-gray-900">Secure Payment</h1>
          <p className="payP mt-2 text-gray-600">Complete your purchase with confidence</p>
        </div>

        <div className=" payDiv overflow-hidden">
          <div className="p-6 sm:p-8">
            {savedPayments.length > 0 ? (
              <div className="mb-8">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Your Saved Payment Methods</h2>
                <div className="space-y-4">
                  {savedPayments.map((payment, index) => (
                    <div key={payment._id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-indigo-300 transition">
                      <div className="flex items-center">
                        <div className="bg-indigo-100 p-2 rounded-full mr-4">
                          <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800">Card ending in {payment.cardNumber.slice(-4)}</h3>
                          <p className="text-sm text-gray-500">Expires {payment.expiryDate}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleSavedCardPayment(payment)}
                          className="px-3 py-1 text-sm  rounded-md transition cursor-pointer "
                        >
                          Pay
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ):(
              <div className='text-center'>
                <h1>No Card Available</h1>
              </div>
            )}

            <div className="paymentForm flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium text-gray-900">Payment Information</h2>
              <Link 
                to='/shippingform' 
                state={{ isUpdate: !!shippingDetails }}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500 flex items-center"
              >
                {shippingDetails ? 'Update Shipping' : 'Add Shipping'}
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Card Number
                </label>
                <div className={`relative rounded-md shadow-sm ${!isCardValid && cardNumber ? 'border-red-300' : ''}`}>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    className={`block w-full px-4 py-3 rounded-md border ${!isCardValid && cardNumber ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'} shadow-sm`}
                    required
                    maxLength={19}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                {!isCardValid && cardNumber && (
                  <p className="mt-1 text-sm text-red-600">Please enter a valid 16-digit card number</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    id="expiryDate"
                    name="expiryDate"
                    placeholder="MM/YY"
                    value={expiryDate}
                    onChange={handleExpiryDateChange}
                    className="block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    required
                    maxLength={5}
                  />
                </div>
                <div>
                  <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                    CVV
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    placeholder="123"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/[^0-9]/g, ''))}
                    className="block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    required
                    maxLength={4}
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg shadow-md transition duration-200 flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Complete Payment
                </button>
              </div>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-center">
                <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
                <span className="text-sm text-gray-500">Payments are secure and encrypted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;