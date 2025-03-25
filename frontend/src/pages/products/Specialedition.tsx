import axios from 'axios';
import React, { useEffect, useState } from 'react';

// Define a type for the coffee data
interface Coffee {
  _id: string;
  name: string;
  description: string;
  price: number;
}

const SpecialEdition = () => {
  const [specialCoffee, setSpecialCoffee] = useState<Coffee[]>([]); // Use Coffee[] type for the state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Error can be a string or null

  useEffect(() => {
    // Fetch data from Node.js backend
    const fetchCoffeeData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.REACT_APP_API_URL}/specialedition`);
        // Response validation
        if (response.status !== 200) {
          throw new Error('Failed to fetch coffee data');
        }
        console.log('values' , response.data)
        setSpecialCoffee(response.data); // Correctly access the parsed data
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message); // Now TypeScript knows `err` is an `Error`
        } else {
          setError('An unknown error occurred'); // Fallback if the error is not an instance of Error
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCoffeeData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }} className='h-screen bg-black' >
      <h1 className=''>Special Edition Coffees</h1>
      <p>Explore our exclusive collection of premium coffee beans.</p>
      <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        {specialCoffee.map((coffee) => (
          <div key={coffee._id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px' }}>
            <h2>{coffee.name}</h2>
            <p>{coffee.description}</p>
            <p style={{ fontWeight: 'bold' }}>${coffee.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialEdition;
