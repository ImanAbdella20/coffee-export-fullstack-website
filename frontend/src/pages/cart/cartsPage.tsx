import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface CartItem {
  _id: string;
  name: string;
  image: string;
  price: string;
  quantity: number;
}

interface CartsPageProps {
  user: any;
  setCartCount: React.Dispatch<React.SetStateAction<number>>;
}

const CartsPage = ({ user, setCartCount }: CartsPageProps) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const navigate = useNavigate();

  // Retrieve cart from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      const parsedCart: CartItem[] = JSON.parse(storedCart);
      setCart(parsedCart);
      setCartCount(parsedCart.reduce((total: number, item: CartItem) => total + item.quantity, 0));
      const selectedSet: Set<string> = new Set(parsedCart.map((item: CartItem) => item._id));
      setSelectedItems(selectedSet);
      setSelectAll(parsedCart.length > 0 && parsedCart.every(item => selectedSet.has(item._id)));
    }
  }, [setCartCount]);

  // Remove selected items from cart
  const removeSelectedItems = () => {
    const updatedCart = cart.filter((item: CartItem) => !selectedItems.has(item._id));
    setCart(updatedCart);
    setSelectedItems(new Set());
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartCount(updatedCart.reduce((total: number, item: CartItem) => total + item.quantity, 0));
  };

  // Update item quantity
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    const updatedCart = cart.map((item: CartItem) =>
      item._id === productId ? { ...item, quantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartCount(updatedCart.reduce((total: number, item: CartItem) => total + item.quantity, 0));
  };

  // Toggle item selection
  const toggleItemSelection = (productId: string) => {
    const updatedSelectedItems = new Set(selectedItems);
    if (updatedSelectedItems.has(productId)) {
      updatedSelectedItems.delete(productId);
    } else {
      updatedSelectedItems.add(productId);
    }
    setSelectedItems(updatedSelectedItems);
  };

  // Handle select all toggle
  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);

    if (newSelectAll) {
      const newSelectedItems = new Set(cart.map((item: CartItem) => item._id));
      setSelectedItems(newSelectedItems);
    } else {
      setSelectedItems(new Set());
    }
  };

  // Calculate total price
  const calculateTotal = () => {
    return cart
      .filter((item: CartItem) => selectedItems.has(item._id))
      .reduce((total, item: CartItem) => total + parseFloat(item.price) * item.quantity, 0)
      .toFixed(2);
  };

  // Updated checkout handler
  const handleCheckOut = async () => {
    if (selectedItems.size === 0) {
      alert('Please select the items you want to checkout!');
      return;
    }
    
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        throw new Error('No auth token found');
      }

      const response = await axios.get(`${import.meta.env.REACT_APP_API_URL}/shipitems/details`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      const hasShippingDetails = response.data.shippingdetails?.length > 0;

      // Get selected items for payment
      const itemsToPay = cart.filter(item => selectedItems.has(item._id));
      
      // Navigate to EachItemPayment with the selected items
      navigate('/itempayment', { 
        state: { 
          selectedItems: itemsToPay,
          hasShippingDetails 
        } 
      });

    } catch (error) {
      console.error('Error checking shipping details:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 flex flex-col">
      <div className="max-w-6xl mx-auto w-full flex-grow">
        <h2 className="carth2 text-2xl font-bold text-center mb-8">Your Cart</h2>
        
        {cart.length > 0 ? (
          <div className="bg-white rounded-lg shadow-md overflow-hidden relative pb-20 ">
            {/* Cart Header */}
            <div className="grid grid-cols-12 gap-4 bg-gray-100 p-4 font-medium border-b ">
              <div className="col-span-1 flex items-center">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                  className="cartcheckbox h-5 w-5 text-blue-600 rounded"
                />
              </div>
              <div className="col-span-5">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Subtotal</div>
            </div>
            
            {/* Cart Items */}
            <div className="divide-y divide-gray-200 ">
              {cart.map((item: CartItem) => (
                <div key={item._id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50 ">
                  {/* Checkbox */}
                  <div className="cartitems col-span-1 flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedItems.has(item._id)}
                      onChange={() => toggleItemSelection(item._id)}
                      className="cartcheckbox h-5 w-5 text-blue-600 rounded"
                    />
                  </div>
                  
                  {/* Product Image and Name */}
                  <div className="col-span-5 flex items-center">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="h-20 w-20 object-cover rounded mr-4"
                    />
                    <span className="font-medium">{item.name}</span>
                  </div>
                  
                  {/* Price */}
                  <div className="col-span-2 text-center">
                    <span className="text-gray-600">{item.price}</span>
                  </div>
                  
                  {/* Quantity Controls */}
                  <div className="col-span-2 flex justify-center">
                    <div className="flex items-center">
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className={`px-3 py-1 bg-gray-200 rounded-l ${item.quantity <= 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300'}`}
                      >
                        -
                      </button>
                      <span className="px-3 py-1 bg-gray-100">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        className="px-3 py-1 bg-gray-200 rounded-r hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  {/* Subtotal */}
                  <div className="col-span-2 text-right">
                    <span className="font-medium">
                      {(parseFloat(item.price) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Sticky Cart Footer */}
            <div className="sticky bottom-0 left-0 right-0 bg-white border-t p-4 shadow-lg">
              <div className="flex flex-wrap justify-between items-center">
                <button
                  onClick={removeSelectedItems}
                  disabled={selectedItems.size === 0}
                  className={`cartbtn px-4 py-2 rounded ${selectedItems.size === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-red-500 text-white hover:bg-red-600'}`}
                >
                  Remove Selected
                </button>
                
                <div className="flex items-center ">
                  <div className="text-xl font-semibold">
                    Total: {calculateTotal()}
                  </div>
                  <button
                    onClick={handleCheckOut}
                    disabled={selectedItems.size === 0}
                    className={`cartbtn px-6 py-2 rounded text-white ${selectedItems.size === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500 text-lg">Your cart is empty.</p>
            <button
              onClick={() => navigate('/products')}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartsPage;