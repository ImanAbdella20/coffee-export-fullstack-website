import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
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

// Helper function to get country name from code
const getCountryName = (code: string) => {
  const match = countryOptions.find(c => c.value === code);
  return match ? match.label : code;
};

const Profile = () => {
  const [userData, setUserData] = useState<{ username: string; email: string } | null>(null);
  const [shippingData, setShippingData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = getAuth().currentUser;
        if (!user) {
          navigate('/login');
          return;
        }

        const idToken = await user.getIdToken();

        // Fetch user profile
        const userResponse = await axios.get(`${import.meta.env.REACT_APP_API_URL}/auth/data`, {
          headers: { Authorization: `Bearer ${idToken}` }
        });
        setUserData(userResponse.data);

        // Fetch shipping details
        const shippingResponse = await axios.get(`${import.meta.env.REACT_APP_API_URL}/shipitems/details`, {
          headers: { Authorization: `Bearer ${idToken}` }
        });
        console.log("Shipping response:", shippingResponse.data);

        setShippingData(shippingResponse.data);

        const hasShippingDetails = shippingResponse.data.shippingdetails?.length > 0;

        // Redirect logic
        if (hasShippingDetails) {
          navigate('/profile');
        } else {
          navigate('/shippingform');
        }

        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('There was an error fetching your data.');
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const shipping = shippingData?.shippingdetails?.[0];

  return (
    <div className="h-screen p-6">
      <h1 className="text-2xl font-semibold mb-4">Profile Settings</h1>

      {userData && shipping ? (
        <div className="space-y-2">
          <p><strong>Username:</strong> {userData.username}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Country:</strong> {shipping.country}</p>
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default Profile;
