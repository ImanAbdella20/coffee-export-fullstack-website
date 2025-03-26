import React, { useState, useEffect } from 'react';
import ConnectionError from '../../component/connectionerror/ConnectionError';
import ReactLoading from 'react-loading';
import useApi from '../../component/connectionerror/useApi';
import { FaArrowLeft, FaArrowRight , FaSync} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

interface Coffee {
  _id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  roastLevel?: string;
  origin?: string;
  quantity?: number;
  maxQuantity: number;
}

const SpecialEdition = () => {
  const { 
    data: specialCoffee, 
    loading, 
    error 
  } = useApi<Coffee[]>(`${import.meta.env.REACT_APP_API_URL}/specialedition`);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showQuantityPopup, setShowQuantityPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Coffee | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState<Coffee[]>([]);
  const [availableQuantity, setAvailableQuantity] = useState(5);
  const itemsPerPage = 3;

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const handleNext = () => {
    if (specialCoffee && currentIndex < specialCoffee.length - itemsPerPage) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleAddToCartClick = (product: Coffee) => {
    setSelectedProduct(product);
    const maxAllowed = Math.min(5, product.maxQuantity || 5);
    setAvailableQuantity(maxAllowed);
    setQuantity(1);
    setShowQuantityPopup(true);
  };

  const handleAddToCartWithQuantity = () => {
    if (!selectedProduct) return;

    const numericQuantity = Number(quantity);
    if (isNaN(numericQuantity) || numericQuantity < 1) {
      setQuantity(1);
      return;
    }

    const finalQuantity = Math.min(numericQuantity, availableQuantity);
    
    const updatedCart = [...cart];
    const existingProductIndex = updatedCart.findIndex(item => item._id === selectedProduct._id);

    if (existingProductIndex > -1) {
      const newQuantity = (updatedCart[existingProductIndex].quantity || 0) + finalQuantity;
      updatedCart[existingProductIndex].quantity = Math.min(newQuantity, availableQuantity);
    } else {
      updatedCart.push({ 
        ...selectedProduct, 
        quantity: finalQuantity
      });
    }

    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setShowQuantityPopup(false);
    setQuantity(1);
  };

  const incrementQuantity = () => {
    setQuantity(prev => {
      const newQuantity = (prev || 0) + 1;
      return Math.min(newQuantity, availableQuantity);
    });
  };

  const decrementQuantity = () => {
    setQuantity(prev => {
      const newQuantity = (prev || 1) - 1;
      return Math.max(1, newQuantity);
    });
  };

  if (error === 'connection') {
    return <ConnectionError />;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ReactLoading 
          type="spinningBubbles" 
          color="#AD7C59" 
          height={80} 
          width={80} 
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="p-6 max-w-md text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">
            Error Loading Products
          </h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#AD7C59] text-white px-4 py-2 rounded hover:bg-[#61300d] transition"
          >
            <FaSync/>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="specialedition min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="specialedition2 max-w-4xl mx-auto relative">
        {/* Header Section */}
        <div className="specialeditionheader text-center mb-16">
          <h1 className="text-4xl font-bold text-[#3A2E26] mb-4 relative inline-block">
            <span className="specialeditionh1 relative z-10 top-3">Special Edition <span className='text-amber-800'>Coffees</span></span>
          </h1>
          <p className="text-lg text-[#5A4A42] max-w-2xl mx-auto relative top-4 left-25">
            Exclusive collection with limited availability. Maximum 5 bags per customer to ensure everyone gets to enjoy.
          </p>
        </div>

        {/* Coffee Products Carousel */}
        {specialCoffee && specialCoffee.length > 0 ? (
          <div className="relative top-5">
            {/* Navigation Arrows */}
            <button 
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`absolute left-0 top-1/2 -translate-y-1/2 -ml-8 z-10 p-3 rounded-full bg-white shadow-md hover:bg-[#F0E6D9] transition ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'}`}
            >
              <FaArrowLeft className="text-[#AD7C59] text-xl" />
            </button>
            
            <button 
              onClick={handleNext}
              disabled={specialCoffee && currentIndex >= specialCoffee.length - itemsPerPage}
              className={`absolute right-0 top-1/2 -translate-y-1/2 -mr-8 z-10 p-3 rounded-full bg-white shadow-md hover:bg-[#F0E6D9] transition ${specialCoffee && currentIndex >= specialCoffee.length - itemsPerPage ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'}`}
            >
              <FaArrowRight className="text-[#AD7C59] text-xl" />
            </button>

            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-300 ease-in-out"
                style={{
                  transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
                  width: `${specialCoffee ? (specialCoffee.length * (100 / itemsPerPage)) : 100}%`
                }}
              >
                {specialCoffee.map((coffee) => (
                  <div
                    key={coffee._id}
                    className="flex-shrink-0 px-4"
                  >
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group h-full">
                      {/* Coffee Image */}
                      <div className="h-64 bg-gradient-to-br from-[#F0E6D9] to-[#D9C7B8] flex items-center justify-center relative overflow-hidden">
                        {coffee.image ? (
                          <img
                            src={coffee.image}
                            alt={coffee.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <span className="text-[#5A4A42]">No image available</span>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <span className="limited absolute top-4 right-4 bg-[#AD7C59] text-white text-xs font-bold px-2 py-1 rounded-full">
                          Only {coffee.maxQuantity} left!
                        </span>
                      </div>

                      {/* Coffee Details */}
                      <div className="h-24 relative">
                        <div className="specialcoffeedetail flex justify-between items-start mb-2">
                          <h2 className="text-xl font-bold text-[#3A2E26]">
                            {coffee.name}
                          </h2>
                          <p className="text-xl font-bold text-[#AD7C59]">
                            ${coffee.price.toFixed(2)}
                          </p>
                        </div>

                        <div className="flex gap-2 mb-3">
                          {coffee.roastLevel && (
                            <span className="text-xs bg-[#F0E6D9] text-[#5A4A42] px-2 py-1 rounded-full">
                              {coffee.roastLevel} Roast
                            </span>
                          )}
                          {coffee.origin && (
                            <span className="text-xs bg-[#F0E6D9] text-[#5A4A42] px-2 py-1 rounded-full">
                              {coffee.origin}
                            </span>
                          )}
                        </div>

                        <p className="specialcoffeedetail text-[#5A4A42] mb-6 line-clamp-3">
                          {coffee.description}
                        </p>

                        <div className="flex items-center absolute bottom-0">
                          <button 
                            className="specialeditionbtn bg-[#AD7C59] hover:bg-[#61300d] text-white px-4 py-2 rounded-lg text-sm font-medium transition flex items-center"
                            onClick={() => handleAddToCartClick(coffee)}
                            disabled={coffee.maxQuantity <= 0}
                          >
                            {coffee.maxQuantity <= 0 ? 'Sold Out' : 'Add to Cart'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dots Indicator */}
            {specialCoffee && specialCoffee.length > itemsPerPage && (
              <div className="flex justify-center mt-8">
                {Array.from({ length: Math.ceil(specialCoffee.length / itemsPerPage) }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index * itemsPerPage)}
                    className={`w-3 h-3 mx-1 rounded-full transition ${currentIndex === index * itemsPerPage ? 'bg-[#AD7C59] w-6' : 'bg-[#D9C7B8]'}`}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          !loading && (
            <div className="text-center py-16 bg-white rounded-xl shadow-sm max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold text-[#3A2E26] mb-3">
                Currently no special edition coffees available
              </h3>
              <p className="text-[#5A4A42] mb-6">
                We're preparing something extraordinary for you. Check back soon!
              </p>
              <button className="bg-[#AD7C59] hover:bg-[#61300d] text-white px-6 py-3 rounded-lg font-medium transition">
                Notify Me When Available
              </button>
            </div>
          )
        )}
      </div>

      {/* Quantity Selection Popup */}
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
              <h2 className="text-lg font-semibold mb-2">Select Quantity for {selectedProduct.name}</h2>
              <p className="text-sm text-[#AD7C59] mb-4">
                Maximum {availableQuantity} per customer (Limited Edition)
              </p>
              <div className="flex items-center justify-center gap-4 mb-6">
                <button
                  className="bg-gray-300 px-4 py-2 rounded text-xl disabled:opacity-50"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="text-2xl font-bold w-10 text-center">{quantity}</span>
                <button
                  className="bg-gray-300 px-4 py-2 rounded text-xl disabled:opacity-50"
                  onClick={incrementQuantity}
                  disabled={quantity >= availableQuantity}
                >
                  +
                </button>
              </div>
              <div className="flex justify-between gap-4">
                <button
                  className="text-gray-600 hover:text-gray-800 px-4 py-2 rounded border border-gray-300 w-full"
                  onClick={() => setShowQuantityPopup(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-[#AD7C59] text-white px-4 py-2 rounded hover:bg-[#61300d] w-full"
                  onClick={handleAddToCartWithQuantity}
                >
                  Add {quantity} to Cart
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SpecialEdition;