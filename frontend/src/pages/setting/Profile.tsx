import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

const Profile = () => {
  const [userData, setUserData] = useState<{ username: string; email: string } | null>(null);
  const [shippingData, setShippingData] = useState<{ country: string } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate(); // Correctly use the navigate function

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = getAuth().currentUser;
        if (!user) {
          navigate('/login');
          return;
        }

        const idToken = await user.getIdToken();

        // Fetch the user profile (username, email)
        const userResponse = await axios.get(`${import.meta.env.REACT_APP_API_URL}/auth/data`, {
          headers: { 
            Authorization: `Bearer ${idToken}`
          }
        });
        setUserData(userResponse.data);

        // Fetch shipping data (country)
        const shippingResponse = await axios.get(`${import.meta.env.REACT_APP_API_URL}/shipitems/details`, {
          headers: { 
            Authorization: `Bearer ${idToken}`
          }
        });
        setShippingData(shippingResponse.data);

        const hasShippingDetails = shippingResponse.data.shippingdetails?.length > 0;

        // Redirect based on shipping details
        if (hasShippingDetails) {
          // If user has shipping form filled, proceed to profile
          navigate('/profile');
        } else {
          if (user) {
            // If user is logged in but has no shipping form, go to shipping form
            navigate('/shippingform');
          } else {
            // If user is not logged in, first navigate to login, then to shipping form
            navigate('/login', { state: { redirectTo: '/profile' } });
          }
        }

        setLoading(false);

      } catch (err) {
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

  return (
    <div className='h-screen'>
      <h1>Profile Settings</h1>

      {userData && shippingData ? (
        <div>
          <p><strong>Username:</strong> {userData.username}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Country:</strong> {shippingData.country}</p>
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default Profile;
