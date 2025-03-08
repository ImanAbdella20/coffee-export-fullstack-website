import React, { useState } from 'react';
import axios from 'axios';

interface ShippingFormProps {
  onSubmit: (shippingDetails: {
    fullName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    phoneNumber: string;
  }) => void;
}

const ShippingForm: React.FC<ShippingFormProps> = ({ onSubmit }) => {
  const [shippingDetails, setShippingDetails] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    phoneNumber: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingDetails(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Send the shipping details to the backend
      const response = await axios.post('http://localhost:5000/shipping', shippingDetails);
      
      // If needed, you can call the onSubmit prop passed down to handle further actions
      onSubmit(shippingDetails);

      // Handle response from the server (e.g., success or error messages)
      console.log('Shipping details saved:', response.data);
      
      // Optionally reset the form after successful submission
      setShippingDetails({
        fullName: '',
        address: '',
        city: '',
        postalCode: '',
        country: '',
        phoneNumber: '',
      });
    } catch (error) {
      console.error('Error saving shipping details:', error);
      alert('There was an error saving your shipping details');
    }
  };

  return (
    <div className='h-screen'>
    <h1 className='text-center'>Fill the Form Below</h1>
       <form onSubmit={handleSubmit} className='flex flex-col gap-6 bg-gray-100 max-w-[60%] h-[70%]'>
     <input type="text" name="fullName" placeholder="Full Name" value={shippingDetails.fullName} onChange={handleChange} required />
     <input type="text" name="address" placeholder="Address" value={shippingDetails.address} onChange={handleChange} required />
     <input type="text" name="city" placeholder="City" value={shippingDetails.city} onChange={handleChange} required />
     <input type="text" name="postalCode" placeholder="Postal Code" value={shippingDetails.postalCode} onChange={handleChange} required />
     <input type="text" name="country" placeholder="Country" value={shippingDetails.country} onChange={handleChange} required />
     <input type="tel" name="phoneNumber" placeholder="Phone Number" value={shippingDetails.phoneNumber} onChange={handleChange} required />
     <button type="submit">Save Shipping Details</button>
   </form>
    </div>
 
  );
};

export default ShippingForm;
