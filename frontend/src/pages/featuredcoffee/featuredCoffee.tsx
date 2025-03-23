import React from 'react';
import coffee1 from '../../assets/images/4.png';
import useInView from '../useInView'; // Adjust the import path as needed

const FeaturedCoffee = () => {
  // Use the useInView hook for each product card
  const [ref1, inView1] = useInView();
  const [ref2, inView2] = useInView();
  const [ref3, inView3] = useInView();

  return (
    <div className="featured bg-gray-100 py-12 flex items-center justify-center relative">
      <div className="featuredcontainer mx-auto px-4 text-center">
        {/* Section Title and Description */}
        <div className="titlediv mb-12 animate-fade-in absolute top-[10px]">
          <h2 className="titleheader font-bold text-brown-900 mb-4">
            Featured Coffee of the Month
          </h2>
          <p className="titlepara text-base  text-gray-700 mb-6 max-w-2xl mx-auto">
            This month, we are excited to feature the finest coffee beans from Ethiopia.
            A perfect blend for coffee connoisseurs, enjoy the vibrant and fruity notes of this
            exceptional brew.
          </p>
        </div>

        {/* Featured Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* First Product */}
          <div
            ref={ref1}
            className={`bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 ${
              inView1 ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
            } hover:scale-105 hover:shadow-xl hover:border-brown-900 hover:border-2`}
          >
            <div className="p-4">
              <div className="flex justify-center">
                <img
                  src={coffee1}
                  alt="Ethiopian Coffee"
                  className="w-32 h-32 object-cover rounded-full"
                />
              </div>
              <h3 className="text-xl font-semibold text-brown-900 mt-4 mb-2">
                Ethiopian Yirgacheffe Coffee
              </h3>
              <p className="text-sm text-gray-700 mb-3">
                This rare and exquisite coffee comes from the Yirgacheffe region of Ethiopia, known for its bright acidity, floral aromas, and citrusy notes.
              </p>
              <ul className="text-sm text-gray-700 mb-4">
                <li>🌱 Origin: Ethiopia, Yirgacheffe</li>
                <li>💥 Flavor Profile: Bright, Floral, Citrus</li>
                <li>☕ Ideal Brewing Method: Pour-Over, Espresso</li>
              </ul>
              <div className="flex justify-center space-x-3">
                <a
                  href="/product/ethiopian-yirgacheffe"
                  className="featuredbutton inline-block py-1 px-4 bg-brown-900 text-white rounded-lg text-sm hover:bg-brown-800 transition-colors duration-300"
                >
                  Shop Now
                </a>
                <a
                  href="/blog/ethiopian-coffee"
                  className="featuredbutton inline-block py-1 px-4 border-2 border-brown-900 text-brown-900 rounded-lg text-sm hover:bg-brown-900 hover:text-white transition-colors duration-300"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>

          {/* Second Product */}
          <div
            ref={ref2}
            className={`bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 ${
              inView2 ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
            } hover:scale-105 hover:shadow-xl hover:border-brown-900 hover:border-2`}
          >
            <div className="p-4">
              <div className="flex justify-center">
                <img
                  src={coffee1}
                  alt="Ethiopian Coffee"
                  className="w-32 h-32 object-cover rounded-full"
                />
              </div>
              <h3 className="text-xl font-semibold text-brown-900 mt-4 mb-2">
                Ethiopian Yirgacheffe Coffee
              </h3>
              <p className="text-sm text-gray-700 mb-3">
                This rare and exquisite coffee comes from the Yirgacheffe region of Ethiopia, known for its bright acidity, floral aromas, and citrusy notes.
              </p>
              <ul className="text-sm text-gray-700 mb-4">
                <li>🌱 Origin: Ethiopia, Yirgacheffe</li>
                <li>💥 Flavor Profile: Bright, Floral, Citrus</li>
                <li>☕ Ideal Brewing Method: Pour-Over, Espresso</li>
              </ul>
              <div className="flex justify-center space-x-3">
                <a
                  href="/product/ethiopian-yirgacheffe"
                  className=" featuredbutton inline-block py-1 px-4 bg-brown-900 text-white rounded-lg text-sm hover:bg-brown-800 transition-colors duration-300"
                >
                  Shop Now
                </a>
                <a
                  href="/blog/ethiopian-coffee"
                  className="featuredbutton  inline-block py-1 px-4 border-2 border-brown-900 text-brown-900 rounded-lg text-sm hover:bg-brown-900 hover:text-white transition-colors duration-300"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>

          {/* Third Product */}
          <div
            ref={ref3}
            className={`bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 ${
              inView3 ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
            } hover:scale-105 hover:shadow-xl hover:border-brown-900 hover:border-2`}
          >
            <div className="p-4">
              <div className="flex justify-center">
                <img
                  src={coffee1}
                  alt="Ethiopian Coffee"
                  className="w-32 h-32 object-cover rounded-full"
                />
              </div>
              <h3 className="text-xl font-semibold text-brown-900 mt-4 mb-2">
                Ethiopian Yirgacheffe Coffee
              </h3>
              <p className="text-sm text-gray-700 mb-3">
                This rare and exquisite coffee comes from the Yirgacheffe region of Ethiopia, known for its bright acidity, floral aromas, and citrusy notes.
              </p>
              <ul className="text-sm text-gray-700 mb-4">
                <li>🌱 Origin: Ethiopia, Yirgacheffe</li>
                <li>💥 Flavor Profile: Bright, Floral, Citrus</li>
                <li>☕ Ideal Brewing Method: Pour-Over, Espresso</li>
              </ul>
              <div className="flex justify-center space-x-3">
                <a
                  href="/product/ethiopian-yirgacheffe"
                  className="featuredbutton inline-block py-1 px-4 bg-brown-900 text-white rounded-lg text-sm hover:bg-brown-800 transition-colors duration-300"
                >
                  Shop Now
                </a>
                <a
                  href="/blog/ethiopian-coffee"
                  className="featuredbutton inline-block py-1 px-4 border-2 border-brown-900 text-brown-900 rounded-lg text-sm hover:bg-brown-900 hover:text-white transition-colors duration-300"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCoffee;