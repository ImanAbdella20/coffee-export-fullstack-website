import React, { useState } from 'react';
import ConnectionError from '../../component/connectionerror/ConnectionError';
import ReactLoading from 'react-loading';
import useApi from '../../component/connectionerror/useApi';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

interface Coffee {
  _id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  roastLevel?: string;
  origin?: string;
}

const SpecialEdition = () => {
  const { 
    data: specialCoffee, 
    loading, 
    error 
  } = useApi<Coffee[]>(`${import.meta.env.REACT_APP_API_URL}/specialedition`);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;

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

  // Handle connection errors
  if (error === 'connection') {
    return <ConnectionError />;
  }

  // Handle loading state
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

  // Handle other errors
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">
            Error Loading Products
          </h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#AD7C59] text-white px-4 py-2 rounded hover:bg-[#61300d] transition"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="specialedition min-h-screen bg-gradient-to-b from-[#F8F3ED] to-[#F0E6D9] py-12 px-4 sm:px-6 lg:px-8">
      <div className="specialedition2 max-w-7xl mx-auto relative">
        {/* Header Section */}
        <div className="specialeditionheader text-center mb-16">
          <h1 className=" text-4xl font-bold text-[#3A2E26] mb-4 relative inline-block">
            <span className="specialeditionh1 relative z-10 px-4">Special Edition Coffees</span>
            <span className="absolute bottom-0 left-0 right-0 h-2 bg-[#AD7C59] opacity-30 z-0"></span>
          </h1>
          <p className="text-lg text-[#5A4A42] max-w-2xl mx-auto">
            Discover our exclusive collection of premium coffee beans, carefully selected for their unique flavors and limited availability.
          </p>
        </div>

        {/* Coffee Products Carousel */}
        {specialCoffee && specialCoffee.length > 0 ? (
          <div className="relative">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
              {specialCoffee.slice(currentIndex, currentIndex + itemsPerPage).map((coffee) => (
                <div
                  key={coffee._id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
                >
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
                    <span className="absolute top-4 right-4 bg-[#AD7C59] text-white text-xs font-bold px-2 py-1 rounded-full">
                      Limited
                    </span>
                  </div>

                  {/* Coffee Details */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
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

                    <p className="text-[#5A4A42] mb-6 line-clamp-3">
                      {coffee.description}
                    </p>

                    <div className="flex justify-between items-center">
                      <button className="text-sm font-medium text-[#AD7C59] hover:text-[#61300d] transition flex items-center">
                        Learn More
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                      <button className="bg-[#AD7C59] hover:bg-[#61300d] text-white px-4 py-2 rounded-lg text-sm font-medium transition flex items-center">
                        Add to Cart
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
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
    </div>
  );
};

export default SpecialEdition;