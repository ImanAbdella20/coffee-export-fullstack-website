import React from 'react';
import { FaSearch } from 'react-icons/fa';
import product1 from '../../assets/images/4.png'

const OurCoffees = () => {
  // Mock coffee products data for demonstration
  const coffeeProducts = [
    {
      id: 1,
      image: product1, 
      name: 'Espresso Blend',
      weight: '250g',
      price: '$15.99',
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/150',
      name: 'Colombian Roast',
      weight: '500g',
      price: '$18.99',
    },
    {
      id: 3,
      image: 'https://via.placeholder.com/150',
      name: 'French Vanilla',
      weight: '200g',
      price: '$12.99',
    },
    {
      id: 4,
      image: 'https://via.placeholder.com/150',
      name: 'Hazelnut Decaf',
      weight: '300g',
      price: '$14.49',
    },
    {
      id: 4,
      image: 'https://via.placeholder.com/150',
      name: 'Hazelnut Decaf',
      weight: '300g',
      price: '$14.49',
    },
    {
      id: 4,
      image: 'https://via.placeholder.com/150',
      name: 'Hazelnut Decaf',
      weight: '300g',
      price: '$14.49',
    },
  ];

  return (
    <div>
      <div className=" search flex justify-between ">
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
            <option value="colombia">Colombia</option>
            <option value="ethiopia">Ethiopia</option>
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
      <div className="product grid grid-cols-4 gap-4 ">
        {coffeeProducts.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <img
              src={product.image}
              alt={product.name}
              className="productimg object-cover rounded-md"
            />
            <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
            <p className="text-gray-600">{product.weight}</p>
            <p className="text-xl font-bold mt-2">{product.price}</p>

            <div className="mt-4 flex justify-between gap-2">
              <button className=" productsbtn bg-[#AD7C59] text-white py-2 px-4 rounded hover:bg-[#61300d] transition-colors">
                Add to Cart
              </button>
              <button className="productsbtn bg-[#61300d] text-white py-2 px-4 rounded hover:bg-[#AD7C59] transition-colors">
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
