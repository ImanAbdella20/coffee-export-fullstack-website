import React from 'react';
import coffee1 from '../../assets/images/4.png'
const FeaturedCoffee = () => {
  return (
    <div className="bg-gray-100 py-16 h-screen">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-brown-900 mb-4">
          Featured Coffee of the Month
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          This month, we are excited to feature the finest coffee beans from Ethiopia.
          A perfect blend for coffee connoisseurs, enjoy the vibrant and fruity notes of this
          exceptional brew.
        </p>

        {/* Featured Product Details */}
        <div className="flex flex-row gap-16 items-center">
          {/* First Product */}
          <div className="">
            <div className="w-[60%] h-[30%]">
              <img
                src={coffee1} // Add the image of the featured coffee
                alt="Ethiopian Coffee"
                className=""
              />
            </div>

            <div className="">
              <h3 className="text-2xl font-semibold text-brown-900 mb-4">
                Ethiopian Yirgacheffe Coffee
              </h3>
              <p className="text-lg text-gray-700 mb-4">
                This rare and exquisite coffee comes from the Yirgacheffe region of Ethiopia, known for its bright acidity, floral aromas, and citrusy notes.
              </p>
              <ul className="text-gray-700 mb-6">
                <li>🌱 Origin: Ethiopia, Yirgacheffe</li>
                <li>💥 Flavor Profile: Bright, Floral, Citrus</li>
                <li>☕ Ideal Brewing Method: Pour-Over, Espresso</li>
              </ul>

              <div className="flex space-x-4">
                <a
                  href="/product/ethiopian-yirgacheffe"
                  className="inline-block py-2 px-6 bg-brown-900 text-white rounded-lg text-lg hover:bg-brown-800"
                >
                  Shop Now
                </a>
                <a
                  href="/blog/ethiopian-coffee"
                  className="inline-block py-2 px-6 border-2 border-brown-900 text-brown-900 rounded-lg text-lg hover:bg-brown-900 hover:text-white"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>

          {/* Second Product */}
          <div className="">
            <div className="">
              <img
                 src={coffee1} // Add the image of the featured coffee
                alt="Ethiopian Coffee"
                className="w-[70%]"
              />
            </div>

            <div className="">
              <h3 className="text-2xl font-semibold text-brown-900 mb-4">
                Ethiopian Yirgacheffe Coffee
              </h3>
              <p className="text-lg text-gray-700 mb-4">
                This rare and exquisite coffee comes from the Yirgacheffe region of Ethiopia, known for its bright acidity, floral aromas, and citrusy notes.
              </p>
              <ul className="text-gray-700 mb-6">
                <li>🌱 Origin: Ethiopia, Yirgacheffe</li>
                <li>💥 Flavor Profile: Bright, Floral, Citrus</li>
                <li>☕ Ideal Brewing Method: Pour-Over, Espresso</li>
              </ul>

              <div className="flex space-x-4">
                <a
                  href="/product/ethiopian-yirgacheffe"
                  className="inline-block py-2 px-6 bg-brown-900 text-white rounded-lg text-lg hover:bg-brown-800"
                >
                  Shop Now
                </a>
                <a
                  href="/blog/ethiopian-coffee"
                  className="inline-block py-2 px-6 border-2 border-brown-900 text-brown-900 rounded-lg text-lg hover:bg-brown-900 hover:text-white"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>

          {/* Third Product */}
          <div className="">
            <div className="">
              <img
                src={coffee1} // Add the image of the featured coffee
                alt="Ethiopian Coffee"
                className="w-[70%]"
              />
            </div>

            <div className="">
              <h3 className="text-2xl font-semibold text-brown-900 mb-4">
                Ethiopian Yirgacheffe Coffee
              </h3>
              <p className="text-lg text-gray-700 mb-4">
                This rare and exquisite coffee comes from the Yirgacheffe region of Ethiopia, known for its bright acidity, floral aromas, and citrusy notes.
              </p>
              <ul className="text-gray-700 mb-6">
                <li>🌱 Origin: Ethiopia, Yirgacheffe</li>
                <li>💥 Flavor Profile: Bright, Floral, Citrus</li>
                <li>☕ Ideal Brewing Method: Pour-Over, Espresso</li>
              </ul>

              <div className="flex space-x-4">
                <a
                  href="/product/ethiopian-yirgacheffe"
                  className="inline-block py-2 px-6 bg-brown-900 text-white rounded-lg text-lg hover:bg-brown-800"
                >
                  Shop Now
                </a>
                <a
                  href="/blog/ethiopian-coffee"
                  className="inline-block py-2 px-6 border-2 border-brown-900 text-brown-900 rounded-lg text-lg hover:bg-brown-900 hover:text-white"
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
