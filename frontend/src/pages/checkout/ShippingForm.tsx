import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import Flag from 'react-world-flags';
import { parsePhoneNumberFromString, CountryCode } from 'libphonenumber-js';

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



  // Handle country change
  const handleCountryChange = (newValue: { value: string; label: string } | null) => {
    setSelectedCountry(newValue);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;  // Cast to HTMLFormElement

    // Collect form data using form elements
    const shippingData = {
      fullName: (form.elements.namedItem('fullName') as HTMLInputElement).value,
      address: (form.elements.namedItem('address') as HTMLInputElement).value,
      city: (form.elements.namedItem('city') as HTMLInputElement).value,
      postalCode: (form.elements.namedItem('postalCode') as HTMLInputElement).value,
      country: selectedCountry?.value,
      phoneNumber: (form.elements.namedItem('phoneNumber') as HTMLInputElement).value,
    };

    try {

      const response = await axios.post(`${import.meta.env.REACT_APP_API_URL}/shipitems/add`, shippingData);

      if (response.status === 200) {
        alert('Shipping details saved successfully!');
      }
    } catch (error) {
      console.error('Error saving shipping details:', error);
      alert('There was an error saving your shipping details.');
    }
  }

  // Handle phone number change and validate it based on selected country
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phoneValue = e.target.value;
    setPhoneNumber(phoneValue);

    // Validate phone number using libphonenumber-js
    if (selectedCountry) {
      const phoneNumberObj = parsePhoneNumberFromString(phoneValue, selectedCountry.value as CountryCode);
      if (phoneNumberObj && phoneNumberObj.isValid()) {
        setIsPhoneValid(true);
      } else {
        setIsPhoneValid(false);
      }
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
          <label htmlFor="country">Country: </label>
          <Select
            id="country"
            value={selectedCountry}
            onChange={handleCountryChange}
            options={countryOptions}
            formatOptionLabel={(data) => (
              <div className="flex items-center gap-2">
                {/* Render flag and country name */}
                <Flag code={data.value} style={{ width: 20, height: 15 }} />
                <span>{data.label}</span>
              </div>
            )}
            placeholder="Select your country"
            className="w-full"
          />
          <span className="text-red-500">*</span>
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
        <button type="submit" className='shipformbtn'>Save Shipping Details</button>
      </form>
    </div>
  );
};

export default ShippingForm;
