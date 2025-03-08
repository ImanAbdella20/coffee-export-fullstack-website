import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import ReactLoading from 'react-loading';
import { motion, AnimatePresence } from 'framer-motion';
import debounce from 'lodash.debounce';
import { Link, useNavigate } from 'react-router';

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
  const [coffeeProducts, setCoffeeProducts] = useState<Product[]>([]); // Store the products to be displayed
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cart, setCart] = useState<Product[]>([]);
  const [showQuantityPopup, setShowQuantityPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [search, setSearch] = useState('');
  const [roastLevelFilter, setRoastLevelFilter] = useState('');
  const [originFilter, setOriginFilter] = useState('');
  const [coffeeTypeFilter, setCoffeeTypeFilter] = useState('');
  const [page, setPage] = useState(1); // Track the current page
  const [totalProducts, setTotalProducts] = useState(0); // Total number of products for pagination

  const navigate = useNavigate();

  // Debounced search function (1 second delay for search)
  const debouncedSearch = debounce(async () => {
    setLoading(true);
    try {
      const params = search || roastLevelFilter || originFilter || coffeeTypeFilter
        ? { search, roastLevel: roastLevelFilter, origin: originFilter, coffeeType: coffeeTypeFilter, page, limit: 8 }
        : { limit: 8 };  // Fetch 8 random products if no filters are applied

      const response = await axios.get(`${import.meta.env.REACT_APP_API_URL}/products`, { params });

      setCoffeeProducts(response.data.products);
      setTotalProducts(response.data.totalProducts); // Total count for pagination
      setLoading(false);
    } catch (err) {
      setError('Failed to load products');
      setLoading(false);
    }
  }, 1000); // Delay of 1000ms after the user stops typing

  // Debounced filters function (2 second delay for filters)
  const debouncedFilters = debounce(async () => {
    setLoading(true);
    try {
      const params = search || roastLevelFilter || originFilter || coffeeTypeFilter
        ? { search, roastLevel: roastLevelFilter, origin: originFilter, coffeeType: coffeeTypeFilter, page, limit: 8 }
        : { limit: 8 };

      const response = await axios.get(`${import.meta.env.REACT_APP_API_URL}/products`, { params });

      setCoffeeProducts(response.data.products);
      setTotalProducts(response.data.totalProducts); // Total count for pagination
      setLoading(false);
    } catch (err) {
      setError('Failed to load products');
      setLoading(false);
    }
  }, 4000); // Delay of 2000ms for filters

  // Trigger debounced search whenever search changes
  useEffect(() => {
    debouncedSearch();
  }, [search]); // Only re-fetch on search change

  // Trigger debounced filters whenever filters change
  useEffect(() => {
    debouncedFilters();
  }, [roastLevelFilter, originFilter, coffeeTypeFilter, page]); // Re-fetch on filter changes

  const handleAddToCartDirectly = (product: Product) => {
    setSelectedProduct(product);
    setShowQuantityPopup(true); // Show the quantity popup when a product is selected
  };

  const handleAddToCartWithQuantity = (product: Product, quantity: number) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(item => item._id === product._id);
      let updatedCart;

      if (existingProductIndex > -1) {
        updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += quantity; // Increment by the selected quantity
      } else {
        updatedCart = [...prevCart, { ...product, quantity }];
      }

      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });

    setShowQuantityPopup(false);  // Close the popup after adding to the cart
    setQuantity(1);  // Reset quantity to 1 after adding
  };

  const loadMoreProducts = () => {
    if (coffeeProducts.length < totalProducts) {
      setPage((prevPage) => prevPage + 1); // Load next page
    }
  };

  if (loading) {
    return <ReactLoading type="spin" color="#000" height={50} width={50} />;
  }

  if (error) {
    return <div>{error}</div>;
  }

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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <FaSearch className="text-gray-600 p-2" />
          </div>

          {/* Roast Level Filter */}
          <select
            className="border px-4 py-2 rounded"
            value={roastLevelFilter}
            onChange={(e) => setRoastLevelFilter(e.target.value)}
          >
            <option value="">Roast Level</option>
            <option value="Light">Light</option>
            <option value="Medium">Medium</option>
            <option value="Dark">Dark</option>
          </select>

          {/* Origin Filter */}
          <select
            className="border px-4 py-2 rounded"
            value={originFilter}
            onChange={(e) => setOriginFilter(e.target.value)}
          >
            <option value="">Origin</option>
            <option value="Jimma">Jimma (Ethiopia)</option>
            <option value="Sidamo">Sidamo (Ethiopia)</option>
            <option value="Yirgacheffe">Yirgacheffe (Ethiopia)</option>
          </select>

          {/* Coffee Type Filter */}
          <select
            className="border px-4 py-2 rounded"
            value={coffeeTypeFilter}
            onChange={(e) => setCoffeeTypeFilter(e.target.value)}
          >
            <option value="">Coffee Type</option>
            <option value="Whole">Whole Bean</option>
            <option value="Grinded">Ground</option>
          </select>
        </div>

        {/* Product List */}
        <div className="product grid grid-cols-4 gap-4 mt-6 cursor-pointer">
          {coffeeProducts.length > 0 ? (
            coffeeProducts.map((product) => (
              <div key={product._id} className="border p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <img src={product.image} alt={product.name} className="productimg object-cover rounded-md" />
                <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
                <p className="text-gray-600">{product.weight}</p>
                <p className="text-xl font-bold mt-2">{product.price}</p>

                <div className="mt-4 flex justify-between gap-2">
                  <button
                    className="productsbtn bg-[#AD7C59] text-white py-2 px-4 rounded hover:bg-[#61300d] cursor-pointer"
                    onClick={() => handleAddToCartDirectly(product)}
                  >
                    Add to Cart
                  </button>

                  <Link to='/shippingform'>
                  <button
                    className="productsbtn bg-[#AD7C59] text-white py-2 px-4 rounded hover:bg-[#61300d] cursor-pointer"
                  >
                    Buy Now
                  </button>
                  </Link>
                 
                </div>
              </div>
            ))
          ) : (
            <div>No products available</div>
          )}
        </div>

        {/* Load More Button */}
        {coffeeProducts.length < totalProducts && (
          <button
            className="mt-6 bg-[#AD7C59] text-white px-4 py-2 rounded hover:bg-[#61300d]"
            onClick={loadMoreProducts}
          >
            Load More
          </button>
        )}
      </div>

      {/* Smooth Popup for Quantity */}
      <AnimatePresence>
        {showQuantityPopup && selectedProduct && (
          <>
            <motion.div
              className="fixed inset-0 backdrop-blur-md z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowQuantityPopup(false)}
            />
            <motion.div
              className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white p-6 shadow-xl border-t rounded-t-lg z-50"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <h2 className="text-lg font-semibold mb-4">Select Quantity for {selectedProduct.name}</h2>
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
                <button
                  className="bg-[#AD7C59] text-white px-4 py-2 rounded cursor-pointer"
                  onClick={() => handleAddToCartWithQuantity(selectedProduct, quantity)}
                >
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
