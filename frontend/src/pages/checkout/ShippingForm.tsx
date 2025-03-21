import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import Flag from 'react-world-flags';
import { parsePhoneNumberFromString, CountryCode } from 'libphonenumber-js';
import { getAuth } from 'firebase/auth';
import { useNavigate, useLocation } from 'react-router';

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
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [isUpdating, setIsUpdating] = useState(false); // Flag to check if it's an update mode
  const navigate = useNavigate();
  const location = useLocation();

  const isUpdate = location.state?.isUpdate;

  // Handle country change
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

  // Fetch existing shipping details if we're in update mode
  useEffect(() => {
    if (isUpdate) {
      const fetchShippingDetails = async () => {
        const user = getAuth().currentUser;
        if (!user) {
          alert('You need to be logged in.');
          navigate('/login');
          return;
        }

        const idToken = await user.getIdToken();
        if (!idToken) {
          alert('ID token is missing');
          return;
        }

        try {
          const response = await axios.get(`${import.meta.env.REACT_APP_API_URL}/shipitems/details/`, {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          });

          const shippingData = response.data;
          setFullName(shippingData.fullName);
          setAddress(shippingData.address);
          setCity(shippingData.city);
          setPostalCode(shippingData.postalCode);
          setPhoneNumber(shippingData.phoneNumber);

          const countryOption = countryOptions.find(option => option.value === shippingData.country);
          setSelectedCountry(countryOption || null);

          setIsUpdating(true); // Set flag for updating
        } catch (error) {
          console.error('Error fetching shipping details:', error);
          alert('Failed to fetch shipping details.');
        }
      };

      fetchShippingDetails();
    }
  }, [isUpdate, navigate]); // Ensure it re-runs when needed (e.g., navigate changes)

  // Handle form submission (Add or Update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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

    // Get Firebase auth token
    const user = getAuth().currentUser;
    if (!user) {
      alert('User is not logged in');
      return;
    }

    const idToken = await user.getIdToken();
    if (!idToken) {
      alert('ID token is missing');
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
      let response;
      if (isUpdating) {
        // Update existing shipping data
        response = await axios.put(`${import.meta.env.REACT_APP_API_URL}/shipitems/update/`, shippingData, {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        });
      } else {
        // Add new shipping data
        response = await axios.post(`${import.meta.env.REACT_APP_API_URL}/shipitems/add`, shippingData, {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        });
      }

      if (response.status === 200) {
        alert(isUpdating ? 'Shipping details updated successfully!' : 'Shipping details saved successfully!');
        navigate('/paymentprocess');
      }
    } catch (error) {
      console.error('Error saving shipping details:', error);
      alert('There was an error saving your shipping details.');
    }
  };

  return (
    <div className="h-screen">
      <h1 className="text-center shipformheader">{isUpdating ? 'Update Shipping Details' : 'Fill Out The Form Below'}</h1>
      <form className="shipform flex flex-col gap-4 bg-gray-100 max-w-[60%] h-[90%] absolute left-[35%]" onSubmit={handleSubmit}>
        <label htmlFor="fullName">Full Name: <span className="text-red-500">*</span></label>
        <input type="text" name="fullName" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
        
        <label htmlFor="address">Address: <span className="text-red-500">*</span></label>
        <input type="text" name="address" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
        
        <label htmlFor="city">City: <span className="text-red-500">*</span></label>
        <input type="text" name="city" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} required />
        
        <label htmlFor="postalCode">Postal Code: <span className="text-red-500">*</span></label>
        <input type="text" name="postalCode" placeholder="Postal Code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
        
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

        <label htmlFor="phoneNumber">Phone Number: <span className="text-red-500">*</span></label>
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

        <button type="submit" className="shipformbtn">{isUpdating ? 'Update Shipping' : 'Proceed to payment'}</button>
      </form>
    </div>
  );
};

export default ShippingForm;
