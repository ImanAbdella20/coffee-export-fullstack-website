import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import ReactLoading from 'react-loading';
import { motion, AnimatePresence } from 'framer-motion';

interface Product {
  _id: string;
  name: string;
  image: string;
  weight: string;
  price: string;
  roastLevel: string;  // Added roastLevel field
  origin: string;      // Added origin field
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

  // Handle opening quantity selection popup
  const openQuantityPopup = (product: Product) => {
    setSelectedProduct(product);
    setShowQuantityPopup(true);
    setQuantity(1);
  };

  // Handle adding to cart
  const addToCart = async () => {
    if (!selectedProduct) return;

    const response = await axios.post(`${import.meta.env.REACT_APP_API_URL}/cart/add`, {
      productId: selectedProduct._id,
      quantity,
    });

    if (response.status === 200) {
      setCart((prevCart) => {
        const productInCart = prevCart.find((item) => item._id === selectedProduct._id);
        if (productInCart) {
          return prevCart;
        }
        return [...prevCart, selectedProduct];
      });
      setShowQuantityPopup(false); // Close popup after adding
    }
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
            {/* Add more origins as needed */}
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
            {/* Add more origins as needed */}
          </select>

          {/* grind type Filter */}
          <select
            value={filters.origin}
            onChange={handleOriginChange}
            className="border px-4 py-2 rounded"
          >
            <option value="">Grind Type</option>
            <option value="Ethiopia">Whole Grinded</option>
            <option value="Colombia">Colombia</option>
            <option value="Brazil">Brazil</option>
            {/* Add more origins as needed */}
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
                  onClick={() => openQuantityPopup(product)}
                >
                  Add to Cart
                </button>
                <button
                  className="productsbtn bg-[#AD7C59] text-white py-2 px-4 rounded hover:bg-[#61300d] cursor-pointer"
                >
                 Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Smooth Popup */}
      <AnimatePresence>
        {showQuantityPopup && (
          <>
            {/* Blurred background (without darkening) */}
            <motion.div
              className="fixed inset-0 backdrop-blur-md z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowQuantityPopup(false)}
            />

            {/* Popup (remains sharp & clear) */}
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
