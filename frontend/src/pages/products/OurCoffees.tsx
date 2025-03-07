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
  const [search, setSearch] = useState('');
  const [roastLevelFilter, setRoastLevelFilter] = useState('');
  const [originFilter, setOriginFilter] = useState('');
  const [coffeeTypeFilter, setCoffeeTypeFilter] = useState('');

  useEffect(() => {
    const fetchCoffeeProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.REACT_APP_API_URL}/products`);
        console.log('Response Data:', response.data);
        
        const products = response.data.product || []; // Default to empty array if no product key exists
        setCoffeeProducts(products);
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

  if (loading) {
    return <ReactLoading type="spin" color="#000" height={50} width={50} />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Get the quantity for the selected product from the cart
  const getProductQuantity = (productId: string) => {
    const productInCart = cart.find(item => item._id === productId);
    return productInCart ? productInCart.quantity : 0; // Return 0 if the product isn't in the cart
  };

  const handleAddToCartDirectly = (product: Product) => {
    setSelectedProduct(product);
    
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(item => item._id === product._id);
      let updatedCart;

      if (existingProductIndex > -1) {
        // Update the existing product quantity
        updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += 1; // Increment by 1
      } else {
        updatedCart = [...prevCart, { ...product, quantity: 1 }]; // Add new product with quantity 1
      }

      // Update localStorage after cart has been updated
      localStorage.setItem('cart', JSON.stringify(updatedCart));

      return updatedCart; // Return updated cart
    });

    setShowQuantityPopup(false); // Close popup after adding
  };

  // Add the product to the cart with selected quantity
  const addToCart = () => {
    if (!selectedProduct) return;
  
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(item => item._id === selectedProduct._id);
      let updatedCart;
  
      if (existingProductIndex > -1) {
        // Product exists, update the quantity by adding the selected quantity
        updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += quantity;
      } else {
        // Product doesn't exist, add the new product to the cart
        updatedCart = [...prevCart, { ...selectedProduct, quantity }];
      }
  
      // Update localStorage after cart has been updated
      localStorage.setItem('cart', JSON.stringify(updatedCart));
  
      return updatedCart; // Return the updated cart
    });
  
    setShowQuantityPopup(false); // Close the quantity popup
    setQuantity(1); // Reset the quantity after adding to cart
  };

  const openQuantityPopup = (product: Product) => {
    setSelectedProduct(product);
    setQuantity(getProductQuantity(product._id)); // Set the quantity to the current value from the cart
    setShowQuantityPopup(true); // This will show the popup
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
          {Array.isArray(coffeeProducts) && coffeeProducts.length > 0 ? (
            coffeeProducts.map((product) => (
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
            ))
          ) : (
            <div>No products available</div>
          )}
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
