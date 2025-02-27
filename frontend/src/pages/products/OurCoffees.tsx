import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import ReactLoading from 'react-loading'; // Optional for improved loading UI
import product1 from '../../assets/images/4.png';

// Define product type
interface Product {
  _id: string;
  name: string;
  image: string;
  weight: string;
  price: string;
}

const OurCoffees = () => {
  const [coffeeProducts, setCoffeeProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState<string | null>(null);
  const [cart , setCart] = useState<Product[]>([]);

  useEffect(() => {
    const fetchCoffeeProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.REACT_APP_API_URL}/products`);
        setCoffeeProducts(response.data);
        setLoading(false); // Set loading to false after data is fetched
      } catch (err: any) {
        setError('Failed to load products');
        setLoading(false); // Set loading to false even if there is an error
      }
    };
  
    fetchCoffeeProducts(); // Call the async function to fetch data
  }, []);
  

  // Handle loading state
  if (loading) {
    return <ReactLoading type="spin" color="#000" height={50} width={50} />;
  }

  // Handle error state
  if (error) {
    return <div>{error}</div>;
  }

  const addToCart = (product:Product) => {
 setCart((prevCart) => {
  const productInCart = prevCart.find((item => item._id === product._id));
  if (productInCart) {
    // If product already exists in cart, return cart without adding again
    return prevCart;
  }
  return [...prevCart, product];
 })
  }

  return (
    <div>
      <div className="search flex justify-between">
        {/* Search Coffee */}
        <div className="flex border border-gray-300 rounded-lg">
          <input
            type="text"
            placeholder="Search Coffee"
            className="px-4 py-2 rounded-l-lg"
          />
          <FaSearch className="text-gray-600 p-2" />
        </div>

        {/* Filter Coffee */}
        <div className="flex gap-4">
          <select className="border border-gray-300 rounded p-2">
            <option value="">Select Type</option>
            <option value="grinded">Grinded</option>
            <option value="whole">Roasted Whole Bean</option>
          </select>
          <select className="border border-gray-300 rounded p-2">
            <option value="">Select Roast Level</option>
            <option value="light">Light</option>
            <option value="medium">Medium</option>
            <option value="dark">Dark</option>
          </select>
          <select className="border border-gray-300 rounded p-2">
            <option value="">Select Coffee Origin</option>
            <option value="colombia">Yergachefe</option>
            <option value="ethiopia">Jimma</option>
          </select>
          <select className="border border-gray-300 rounded p-2">
            <option value="">Select Flavour</option>
            <option value="fruity">Fruity</option>
            <option value="nutty">Nutty</option>
            <option value="chocolatey">Chocolatey</option>
          </select>
        </div>
      </div>

      {/* Products */}
      <div className="product grid grid-cols-4 gap-4">
        {coffeeProducts.map((product) => (
          <div key={product._id} className="border p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <img
              src={product.image}
              alt={product.name}
              className="productimg object-cover rounded-md"
            />
            <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
            <p className="text-gray-600">{product.weight}</p>
            <p className="text-xl font-bold mt-2">{product.price}</p>

            <div className="mt-4 flex justify-between gap-2">
              <button 
              className="productsbtn bg-[#AD7C59] text-white py-2 px-4 rounded hover:bg-[#61300d] cursor-pointer"
              onClick = {() => addToCart(product)}
              >
                Add to Cart
              </button>
              <button className="productsbtn bg-[#61300d] text-white py-2 px-4 rounded hover:bg-[#AD7C59] cursor-pointer">
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurCoffees;
