import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import Flag from 'react-world-flags';

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

  // Handle country change
  const handleCountryChange = (newValue: { value: string; label: string } | null) => {
    setSelectedCountry(newValue);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the form submission here (send data to the server)
  };

  return (
    <div className="h-screen">
      <h1 className="text-center shipformheader">Fill Out The Form Below</h1>
      <form className="shipform flex flex-col gap-6 bg-gray-100 max-w-[50%] h-[70%]" onSubmit={handleSubmit}>
        <input type="text" name="fullName" placeholder="Full Name" required />
        <input type="text" name="address" placeholder="Address" required />
        <input type="text" name="city" placeholder="City" required />
        <input type="text" name="postalCode" placeholder="Postal Code" required />
        
        {/* Country Dropdown */}
        <div className="flex items-center gap-3">
          <label htmlFor="country">Country</label>
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
        </div>

        <input type="tel" name="phoneNumber" placeholder="Phone Number" required />
        <button type="submit" className='shipformbtn'>Save Shipping Details</button>
      </form>
    </div>
  );
};

export default ShippingForm;
