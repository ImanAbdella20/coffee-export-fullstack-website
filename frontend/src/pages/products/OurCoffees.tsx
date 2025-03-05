import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import ReactLoading from 'react-loading';
import { motion, AnimatePresence } from 'framer-motion';

interface Product {
  quantity: number;
  _id: string;
  name: string;
  image: string;
  weight: string;
  price: string;
  roastLevel: string;
  origin: string;
}

const OurCoffees = () => {
  const [coffeeProducts, setCoffeeProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cart, setCart] = useState<Product[]>([]);
  const [showQuantityPopup, setShowQuantityPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);

  // Filter States
  const [filters, setFilters] = useState({
    search: '',
    roastLevel: '',
    origin: '',
  });

  useEffect(() => {
    const fetchCoffeeProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.REACT_APP_API_URL}/products`);
        setCoffeeProducts(response.data);
        setLoading(false);
      } catch (err: any) {
        setError('Failed to load products');
        setLoading(false);
      }
    };

    fetchCoffeeProducts();
  }, []);

  useEffect(() => {
    // Load cart from localStorage when component mounts
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, search: e.target.value });
  };

  const handleRoastLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ ...filters, roastLevel: e.target.value });
  };

  const handleOriginChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ ...filters, origin: e.target.value });
  };

  if (loading) {
    return <ReactLoading type="spin" color="#000" height={50} width={50} />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Filter products based on filters
  const filteredProducts = coffeeProducts.filter((product) => {
    const isNameMatch = product.name.toLowerCase().includes(filters.search.toLowerCase());
    const isRoastLevelMatch = filters.roastLevel ? product.roastLevel === filters.roastLevel : true;
    const isOriginMatch = filters.origin ? product.origin === filters.origin : true;
    return isNameMatch && isRoastLevelMatch && isOriginMatch;
  });

 // Handle adding to cart with default quantity 1
const handleAddToCartDirectly = (product: Product) => {
  setSelectedProduct(product);

  // Create a cart item with quantity 1 by default
  const cartItem = { ...product, quantity: 1 };

  // Update cart in state
  setCart((prevCart) => {
    // Check if the product is already in the cart
    const existingProductIndex = prevCart.findIndex(item => item._id === cartItem._id);
    if (existingProductIndex > -1) {
      // If the product exists, do not modify quantity since default is 1
      return [...prevCart];
    }
    // Otherwise, add the product to the cart
    return [...prevCart, cartItem];
  });

  // Store cart in localStorage
  localStorage.setItem('cart', JSON.stringify(cart));

  setShowQuantityPopup(false); // Close popup after adding
};


  // Handle opening quantity selection popup
  const openQuantityPopup = (product: Product) => {
    setSelectedProduct(product);
    setShowQuantityPopup(true);
    setQuantity(1); // Reset to 1 by default
  };

  // Handle adding to cart with user-selected quantity
  const addToCart = () => {
    if (!selectedProduct) return;

    const cartItem = { ...selectedProduct, quantity };

    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(item => item._id === cartItem._id);
      if (existingProductIndex > -1) {
        prevCart[existingProductIndex].quantity += quantity;
        return [...prevCart];
      }
      return [...prevCart, cartItem];
    });

    localStorage.setItem('cart', JSON.stringify(cart));

    setShowQuantityPopup(false); // Close popup after adding
    setQuantity(1); // Reset quantity to 1 after adding
  };

  return (
    <div className="relative">
      {/* Blurred Background when popup is open */}
      <div className={`transition-all duration-300 ${showQuantityPopup ? 'blur-sm' : ''}`}>
        {/* Search & Filters */}
        <div className="search flex justify-between gap-4">
          {/* Search Bar */}
          <div className="flex border border-gray-300 rounded-lg w-1/3">
            <input
              type="text"
              placeholder="Search Coffee"
              className="px-4 py-2 rounded-l-lg"
              value={filters.search}
              onChange={handleSearchChange}
            />
            <FaSearch className="text-gray-600 p-2" />
          </div>

          {/* Roast Level Filter */}
          <select
            value={filters.roastLevel}
            onChange={handleRoastLevelChange}
            className="border px-4 py-2 rounded"
          >
            <option value="">Roast Level</option>
            <option value="Light">Light</option>
            <option value="Medium">Medium</option>
            <option value="Dark">Dark</option>
          </select>

          {/* Origin Filter */}
          <select
            value={filters.origin}
            onChange={handleOriginChange}
            className="border px-4 py-2 rounded"
          >
            <option value="">Origin</option>
            <option value="Ethiopia">Jimma</option>
            <option value="Colombia">Colombia</option>
            <option value="Brazil">Brazil</option>
          </select>
        </div>

        {/* Product List */}
        <div className="product grid grid-cols-4 gap-4 mt-6 cursor-pointer">
          {filteredProducts.map((product) => (
            <div key={product._id} className="border p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img src={product.image} alt={product.name} className="productimg object-cover rounded-md" />
              <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
              <p className="text-gray-600">{product.weight}</p>
              <p className="text-xl font-bold mt-2">{product.price}</p>

              <div className="mt-4 flex justify-between gap-2">
                <button
                  className="productsbtn bg-[#AD7C59] text-white py-2 px-4 rounded hover:bg-[#61300d] cursor-pointer"
                  onClick={() => openQuantityPopup(product)} // Optional popup for quantity
                >
                  Add to Cart
                </button>
                <button
                  className="productsbtn bg-[#AD7C59] text-white py-2 px-4 rounded hover:bg-[#61300d] cursor-pointer"
                  onClick={() => handleAddToCartDirectly(product)} // Direct add to cart with default quantity
                >
                 Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Smooth Popup for Quantity */}
      <AnimatePresence>
        {showQuantityPopup && (
          <>
            {/* Blurred background */}
            <motion.div
              className="fixed inset-0 backdrop-blur-md z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowQuantityPopup(false)}
            />

            {/* Popup Content */}
            <motion.div
              className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white p-6 shadow-xl border-t rounded-t-lg z-50"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <h2 className="text-lg font-semibold mb-4">Select Quantity</h2>
              <div className="flex items-center justify-center gap-4">
                <button
                  className="bg-gray-300 px-3 py-2 rounded"
                  onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
                >
                  -
                </button>
                <span className="text-xl">{quantity}</span>
                <button
                  className="bg-gray-300 px-3 py-2 rounded"
                  onClick={() => setQuantity((prev) => prev + 1)}
                >
                  +
                </button>
              </div>
              <div className="mt-4 flex justify-between">
                <button className="text-red-500 cursor-pointer" onClick={() => setShowQuantityPopup(false)}>
                  Cancel
                </button>
                <button className="bg-[#AD7C59] text-white px-4 py-2 rounded cursor-pointer" onClick={addToCart}>
                  Add to Cart
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OurCoffees;
