import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAuth } from 'firebase/auth';

// Define the structure of the shipping details
interface ShippingDetails {
  city: string;
  address: string;
  postalCode: string;
}

const ShippingAddress = () => {
  const [shippingDetails, setShippingDetails] = useState<ShippingDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchShippingDetails = async () => {
      try {
        const user = getAuth().currentUser;
        if (!user) {
          // Redirect to login if not authenticated
          window.location.href = '/login';
          return;
        }

        const idToken = await user.getIdToken();

        // Fetch shipping details from your backend
        const response = await axios.get(`${import.meta.env.REACT_APP_API_URL}/shipitems/details`, {
          headers: {
            Authorization: `Bearer ${idToken}`, // Send Firebase token as Authorization header
          },
        });

        // Set the shipping details from the response
        setShippingDetails(response.data);
      } catch (err) {
        console.error('Error fetching shipping details:', err);
        setError('There was an error fetching your shipping details.');
      } finally {
        setLoading(false);
      }
    };

    fetchShippingDetails();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Shipping Address</h1>
      {shippingDetails ? (
        <div>
          <p><strong>City:</strong> {shippingDetails.city}</p>
          <p><strong>Address:</strong> {shippingDetails.address}</p>
          <p><strong>Postal Code:</strong> {shippingDetails.postalCode}</p>
        </div>
      ) : (
        <p>No shipping details available</p>
      )}
    </div>
  );
};

export default ShippingAddress;
