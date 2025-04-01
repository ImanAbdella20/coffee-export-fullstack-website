import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface CartItem {
  _id: string;
  name: string;
  image: string;
  price: string;
  quantity: number;
}

const EachItemPayment = () => {
  const [selectedItems, setSelectedItems] = useState<CartItem[]>([]);
  const [hasShippingDetails, setHasShippingDetails] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // First check for items in navigation state
    if (location.state?.selectedItems) {
      setSelectedItems(location.state.selectedItems);
      setHasShippingDetails(location.state.hasShippingDetails || false);
      localStorage.setItem('selectedItems', JSON.stringify(location.state.selectedItems));
    } else {
      // Fallback to localStorage if navigation state isn't available
      const storedItems = localStorage.getItem('selectedItems');
      if (storedItems) {
        setSelectedItems(JSON.parse(storedItems));
      }
    }
  }, [location.state]);

  const handlePayNowClick = (item: CartItem) => {
    // Store the single item being paid for and shipping status
    localStorage.setItem('currentPaymentItem', JSON.stringify(item));
    
    if (hasShippingDetails) {
      navigate('/paymentprocess');
    } else {
      navigate('/shippingform', { 
        state: { 
          itemToPay: item,
          redirectTo: '/paymentprocess'
        } 
      });
    }
  };

  const calculateTotal = (item: CartItem) => {
    return (parseFloat(item.price) * item.quantity).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">Selected Items for Payment</h2>
        
        {selectedItems.length > 0 ? (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="grid grid-cols-12 gap-4 bg-gray-100 p-4 font-medium border-b">
              <div className="col-span-5">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-center">Subtotal</div>
              <div className="col-span-1 text-right">Action</div>
            </div>
            
            <div className="divide-y divide-gray-200">
              {selectedItems.map((item) => (
                <div key={item._id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50">
                  <div className="col-span-5 flex items-center">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="h-20 w-20 object-cover rounded mr-4"
                    />
                    <span className="font-medium">{item.name}</span>
                  </div>
                  
                  <div className="col-span-2 text-center">
                    <span className="text-gray-600">{item.price}</span>
                  </div>
                  
                  <div className="col-span-2 text-center">
                    <span>{item.quantity}</span>
                  </div>
                  
                  <div className="col-span-2 text-center">
                    <span className="font-medium">{calculateTotal(item)}</span>
                  </div>
                  
                  <div className="col-span-1 text-right">
                    <button
                      onClick={() => handlePayNowClick(item)}
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Pay Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500 text-lg">No items selected for payment.</p>
            <button
              onClick={() => navigate('/cart')}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Back to Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EachItemPayment;