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
    const updatedCart = cart.filter((item: CartItem) => updatedSelectedItems.has(item._id));
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Handle select all toggle
  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);

    if (newSelectAll) {
      const newSelectedItems = new Set(cart.map((item: CartItem) => item._id));
      setSelectedItems(newSelectedItems);
      updateLocalStorage(newSelectedItems);
    } else {
      setSelectedItems(new Set());
      updateLocalStorage(new Set());
    }
  };

  // Helper to update localStorage when selecting/unselecting items
  const updateLocalStorage = (updatedSelectedItems: Set<string>) => {
    const updatedCart = cart.filter((item: CartItem) => updatedSelectedItems.has(item._id));
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Calculate total price
  const calculateTotal = () => {
    return cart
      .filter((item: CartItem) => selectedItems.has(item._id))
      .reduce((total, item: CartItem) => total + parseFloat(item.price) * item.quantity, 0)
      .toFixed(2);
  };

  // Checkout handler
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

      if (hasShippingDetails) {
        navigate('/paymentprocess');
      } else {
        if (user) {
          navigate('/shippingform');
        } else {
          navigate('/login', { state: { redirectTo: '/shippingform' } });
        }
      }

      const orderDetails = {
        userId: user.uid,
        cartItems: cart,
        shippingDetails: response.data.shippingdetails[0],
        totalPrice: calculateTotal(),
      };

      await axios.post(`${import.meta.env.REACT_APP_API_URL}/orderhistory/create`, orderDetails, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

    } catch (error) {
      console.error('Error checking shipping details:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 flex flex-col">
      <div className="max-w-4xl mx-auto w-full flex-grow">
        <h2 className="carth2 text-2xl font-bold text-center mb-8">Your Cart</h2>
        
        {cart.length > 0 ? (
          <div className="bg-white w-[45%] ">
            <div className="divide-y divide-gray-200 grid grid-cols-2 gap-150">
              {cart.map((item: CartItem) => (
                <div key={item._id} className="flex items-center p-4 hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={selectedItems.has(item._id)}
                    onChange={() => toggleItemSelection(item._id)}
                    className="cartcheckbox h-5 w-5 text-blue-600 rounded mr-9"
                  />
                  
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="cartimg h-20 w-20 object-cover rounded"
                  />
                  
                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-medium">{item.name}</h3>
                    <p className="cartprice text-gray-600">${item.price}</p>
                    
                    <div className="mt-2 flex items-center">
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
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">Your cart is empty.</p>
          </div>
        )}
      </div>

      {cart.length > 0 && (
        <div className="cartproceed mt-6 shadow-md rounded-lg p-4 max-w-4xl mx-auto sticky  bottom-0 left-30 h-[100px] flex items-center justify-center w-[70%] ">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
                className="cartcheckbox2 h-5 w-5 text-blue-600 rounded mr-2"
              />
              <span>Select All</span>
            </div>
            
            <div className="text-lg font-semibold">
              Total: ${calculateTotal()}
            </div>
            
            <button
              onClick={handleCheckOut}
              className="cartbtn px-6 py-2 text-white rounded"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartsPage;