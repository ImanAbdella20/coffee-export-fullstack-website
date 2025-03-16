import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import Flag from 'react-world-flags';
import { parsePhoneNumberFromString, CountryCode } from 'libphonenumber-js';
import { getAuth } from 'firebase/auth'; // Import Firebase auth
import { useNavigate } from 'react-router';

const countryOptions = [
  { value: 'ET', label: 'Ethiopia' },
  { value: 'US', label: 'United States' },
  { value: 'IN', label: 'India' },
  { value: 'CN', label: 'China' },
  { value: 'GB', label: 'United Kingdom' },
  { value: 'FR', label: 'France' },
  { value: 'TR', label: 'Turkey' },
  { value: 'SA', label: 'Saudi Arabia' },
  { value: 'ES', label: 'Spain' },
];

const ShippingForm = () => {
  const [selectedCountry, setSelectedCountry] = useState<{ value: string; label: string } | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isPhoneValid, setIsPhoneValid] = useState(true);
  const [orderStatus, setOrderStatus] = useState('');

  const navigate = useNavigate();

  const handleCountryChange = (newValue: { value: string; label: string } | null) => {
    setSelectedCountry(newValue);
  };

  // Handle phone number change and validate it based on selected country
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phoneValue = e.target.value;
    setPhoneNumber(phoneValue);

    if (selectedCountry) {
      const phoneNumberObj = parsePhoneNumberFromString(phoneValue, selectedCountry.value as CountryCode);
      if (phoneNumberObj && phoneNumberObj.isValid()) {
        setIsPhoneValid(true);
      } else {
        setIsPhoneValid(false);
      }
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const form = e.target as HTMLFormElement;  // Cast to HTMLFormElement
  
    // Collect form data using form elements
    const fullName = (form.elements.namedItem('fullName') as HTMLInputElement).value;
    const address = (form.elements.namedItem('address') as HTMLInputElement).value;
    const city = (form.elements.namedItem('city') as HTMLInputElement).value;
    const postalCode = (form.elements.namedItem('postalCode') as HTMLInputElement).value;
    const phoneNumber = (form.elements.namedItem('phoneNumber') as HTMLInputElement).value;
  
    if (!selectedCountry) {
      alert('Country is required');
      return;
    }
  
    if (!fullName || !address || !city || !postalCode || !phoneNumber) {
      alert('All fields are required');
      return;
    }
  
    if (!isPhoneValid) {
      alert('Invalid phone number');
      return;
    }
  
    // Get the Firebase Auth ID token
    const user = getAuth().currentUser;
    if (!user) {
      alert("User is not logged in");
      return;
    }
  
    const idToken = await user.getIdToken();
    if (!idToken) {
      alert("ID token is missing");
      return;
    }
  
    const shippingData = {
      fullName,
      address,
      city,
      postalCode,
      country: selectedCountry?.value,
      phoneNumber,
    };
  
    try {
      // Include the ID token in the Authorization header
      const response = await axios.post(`${import.meta.env.REACT_APP_API_URL}/shipitems/add`, shippingData, {
        headers: {
          Authorization: `Bearer ${idToken}`, // Send token here
        }
      });
  
      if (response.status === 200) {
        alert('Shipping details saved successfully!');
        
        // After saving shipping info, send order details (cart items + shipping) to order history
        const orderDetails = {
          userId: user.uid,  // User ID from Firebase auth
          shippingDetails: shippingData,
          cartItems: JSON.parse(localStorage.getItem('cart') || '[]'),  // Cart data from localStorage
      
        };
  
        await axios.post(`${import.meta.env.REACT_APP_API_URL}/orderhistory/create`, orderDetails, {
          headers: {
            Authorization: `Bearer ${idToken}`,
          }
        });
  
        navigate('/paymentprocess');
      }
    } catch (error) {
      console.error('Error saving shipping details:', error);
      alert('There was an error saving your shipping details.');
    }
  };
  

  

  return (
    <div className="h-screen">
      <h1 className="text-center shipformheader">Fill Out The Form Below</h1>
      <form className="shipform flex flex-col gap-4 bg-gray-100 max-w-[60%] h-[90%] absolute left-[35%]" onSubmit={handleSubmit}>
        <label htmlFor="fullName">Full Name: <span className="text-red-500">*</span></label>
        <input type="text" name="fullName" placeholder="Full Name" required />
        
        <label htmlFor="address">Address: <span className="text-red-500">*</span></label>
        <input type="text" name="address" placeholder="Address" required />
        
        <label htmlFor="city">City: <span className="text-red-500">*</span></label>
        <input type="text" name="city" placeholder="City" required />
        
        <label htmlFor="postalCode">Postal Code: <span className="text-red-500">*</span></label>
        <input type="text" name="postalCode" placeholder="Postal Code" required />
        
        {/* Country Dropdown */}
        <div className="flex items-center gap-3">
          <label htmlFor="country">Country: <span className="text-red-500">*</span></label>
          <Select
            id="country"
            value={selectedCountry}
            onChange={handleCountryChange}
            options={countryOptions}
            formatOptionLabel={(data) => (
              <div className="flex items-center gap-2">
                <Flag code={data.value} style={{ width: 20, height: 15 }} />
                <span>{data.label}</span>
              </div>
            )}
            placeholder="Select your country"
            className="w-full"
          />
        </div>

        {/* Phone Number */}
        <label htmlFor="phoneNumber">
          Phone Number: <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          name="phoneNumber"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          required
        />
        {!isPhoneValid && (
          <span className="text-red-500">Invalid phone number for the selected country</span>
        )}

        <button type="submit" className="shipformbtn">Proceed to payment</button>
      </form>
    </div>
  );
};

export default ShippingForm;
