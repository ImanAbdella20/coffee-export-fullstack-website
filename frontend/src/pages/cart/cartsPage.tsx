import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Fix for 'react-router-dom'
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
  const navigate = useNavigate();

  // Retrieve cart from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      setCart(parsedCart);

      // Update cart count
      setCartCount(parsedCart.reduce((total: number, item: CartItem) => total + item.quantity, 0));

      // Automatically select all items in the cart
      const selectedSet: Set<string> = new Set(parsedCart.map((item: CartItem) => item._id));
      setSelectedItems(selectedSet);
    }
  }, [setCartCount]);

  // Remove selected items from cart
  const removeSelectedItems = () => {
    const updatedCart = cart.filter(item => !selectedItems.has(item._id));
    setCart(updatedCart);
    setSelectedItems(new Set()); // Clear selected items
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Update localStorage

    // Update cart count
    setCartCount(updatedCart.reduce((total: number, item: CartItem) => total + item.quantity, 0));
  };

  // Update item quantity
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return; // Ensure quantity is not less than 1
    const updatedCart = cart.map(item =>
      item._id === productId ? { ...item, quantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Update localStorage

    // Update cart count
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

  // Calculate total price
  const calculateTotal = () => {
    return cart
      .reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0)
      .toFixed(2);
  };

  // Checkout handler
  const handleCheckOut = async () => {
    // Check if the user is logged in
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        throw new Error('No auth token found');
      }

      // Fetch shipping details from API
      const response = await axios.get(`${import.meta.env.REACT_APP_API_URL}/shipitems/details`, {
        headers: {
          Authorization: `Bearer ${authToken}`, // Ensure the user is authenticated
        },
      });

      const hasShippingDetails = response.data.shippingdetails?.length > 0;

      if (hasShippingDetails) {
        // If user has shipping form filled, proceed to payment
        navigate('/paymentprocess');
      } else {
        if (user) {
          // If user is logged in but has no shipping form, go to shipping form
          navigate('/shippingform');
        } else {
          // If user is not logged in, first navigate to login, then to shipping form
          navigate('/login', { state: { redirectTo: '/shippingform' } });
        }
      }

      // Save order details (cart and shipping info) to order history API
      const orderDetails = {
        userId: user.uid,  // Using user ID
        cartItems: cart,    // Send cart items
        shippingDetails: response.data.shippingdetails[0], // Get the first shipping detail
        totalPrice: calculateTotal(), // Get the total price
      };

      // Send the order data to the order history API
      await axios.post(`${import.meta.env.REACT_APP_API_URL}/orderhistory/create`, orderDetails, {
        headers: {
          Authorization: `Bearer ${authToken}`, // Send token here
        },
      });

    } catch (error) {
      console.error('Error checking shipping details:', error);
    }
  };


  return (
    <div className="cart-page h-screen">
      <h2>Your Cart</h2>
      {cart.length > 0 ? (
        <div>
          {cart.map(item => (
            <div key={item._id} className="flex items-center gap-5 bg-gray-100 border-2 max-w-[60%]">
              <input
                type="checkbox"
                checked={selectedItems.has(item._id)}
                onChange={() => toggleItemSelection(item._id)}
                className="checkbox"
              />
              <img src={item.image} alt={item.name} className="product-img" />
              <div className="cart-item-details flex-1">
                <h3>{item.name}</h3>
                <p>{item.price}</p>
                <div className="quantity-controls">
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}

      <div className="bg-gray-200 absolute bottom-0 h-[150px] flex w-[80%] fixed items-center mx-auto justify-around">
        <div className='flex '>
          <input 
          type="checkbox" 
          />
          <h3>Remove all</h3>
        </div>
        <h3>Total: br {calculateTotal()}</h3>
        <button className="check-outbtn" onClick={handleCheckOut}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartsPage;
