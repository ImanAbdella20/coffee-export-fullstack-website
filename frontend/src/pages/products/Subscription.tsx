import React, { FormEvent, useState, useEffect } from 'react';
import { User } from 'firebase/auth'; // Import User from Firebase
import axios from 'axios';

interface SubscriptionProps {
  user: User | null; // Define the prop type for user
}

const Subscription: React.FC<SubscriptionProps> = ({ user }) => {
  const [email, setEmail] = useState('');
  const [plan, setPlan] = useState('monthly');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If a user is logged in, set their email in the email state
    if (user && user.email) {
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError(null); // Reset error on new submission

    try {
      // Send the subscription data to the backend
      const response = await axios.post(`${import.meta.env.REACT_APP_API_URL}/subscription/add`, {
        email,
        plan,
      });

      if (response.status === 201) {
        alert(`Thanks for subscribing with ${email} to the ${plan} plan!`);
      } else {
        throw new Error('Failed to subscribe. Please try again.');
      }

    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        // Check if the error response status is 409 (Already subscribed)
        if (err.response.status === 409) {
          alert('You have already subscribed to a plan.');
        } else {
          setError('There was an error processing your subscription.');
        }
      } else {
        setError('There was an error processing your subscription.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-gray-50">
      <h1>Subscribe to Our Coffee Club</h1>
      <p>Get the best coffee from around the world delivered to your doorstep.</p>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <select
          value={plan}
          onChange={(e) => setPlan(e.target.value)}
        >
          <option value="monthly">Monthly Plan</option>
          <option value="yearly">Yearly Plan</option>
        </select>
        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Subscribe Now'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Show error if any */}
    </div>
  );
};

export default Subscription;
