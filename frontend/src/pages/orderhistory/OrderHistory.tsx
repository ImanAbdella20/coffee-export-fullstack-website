import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAuth } from 'firebase/auth'; // Import Firebase Auth

// Define the ShippingDetail interface
interface ShippingDetail {
  _id: string;
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phoneNumber: string;
}

const OrderHistory = () => {
  // State to store the shipping details, with the correct type
  const [shippingDetails, setShippingDetails] = useState<ShippingDetail[]>([]);
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState<string | null>(null); // Explicitly type error state

  // Fetch shipping details on component mount
  useEffect(() => {
    const fetchShippingDetails = async () => {
      // Get the Firebase Auth user
      const user = getAuth().currentUser;

      if (!user) {
        setError('User is not logged in');
        setLoading(false);
        return;
      }

      try {
        // Get the ID token from Firebase Auth
        const idToken = await user.getIdToken(true);

        if (!idToken) {
          setError('ID token is missing');
          setLoading(false);
          return;
        }

        // Make the API request to fetch shipping details
        const response = await axios.get(`${import.meta.env.REACT_APP_API_URL}/shipitems/details`, {
          headers: {
            Authorization: `Bearer ${idToken}`, // Attach the ID token to the Authorization header
          },
        });

        // Set the shipping details state with the data from the backend
        setShippingDetails(response.data.shippingDetails);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching shipping details:', error);
        setError('There was an error fetching the shipping details');
        setLoading(false);
      }
    };

    fetchShippingDetails();
  }, []);

  // Loading and error handling
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='h-screen'>
      <h1 className='text-center'>Your Shipping Details</h1>

      <div className='flex justify-center'>
        <div className='w-full max-w-4xl'>
          {shippingDetails.length === 0 ? (
            <p>No shipping details found.</p>
          ) : (
            <table className='min-w-full'>
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Address</th>
                  <th>City</th>
                  <th>Postal Code</th>
                  <th>Country</th>
                  <th>Phone Number</th>
                </tr>
              </thead>
              <tbody>
                {shippingDetails.map((detail) => (
                  <tr key={detail._id}>
                    <td>{detail.fullName}</td>
                    <td>{detail.address}</td>
                    <td>{detail.city}</td>
                    <td>{detail.postalCode}</td>
                    <td>{detail.country}</td>
                    <td>{detail.phoneNumber}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
