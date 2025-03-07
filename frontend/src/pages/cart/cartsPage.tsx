import React, { useEffect, useState } from 'react';

interface CartItem {
  _id: string;
  name: string;
  image: string;
  price: string;
  quantity: number;
}

const CartsPage = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState<number>(0); // State for the total count of items in the cart
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set()); // Track selected items

  // Retrieve cart from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      setCart(parsedCart);
      setCartCount(parsedCart.reduce((total: number, item: CartItem) => total + item.quantity, 0)); // Update cart count

      // Set the selected items as checked when the cart is loaded
      const selectedSet: Set<string> = new Set(parsedCart.map((item: CartItem) => item._id)); // Fix the type issue
      setSelectedItems(selectedSet); // Make items checked by default when loaded
    }
  }, []);

  // Remove selected items from cart
  const removeSelectedItems = () => {
    const updatedCart = cart.filter(item => !selectedItems.has(item._id));
    setCart(updatedCart);
    setCartCount(updatedCart.reduce((total: number, item: CartItem) => total + item.quantity, 0)); // Update cart count
    setSelectedItems(new Set()); // Reset selected items
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Save updated cart to localStorage
  };

   // Update item quantity
   const updateQuantity = (productId: string, quantity: number) => {
    const updatedCart = cart.map(item =>
      item._id === productId ? { ...item, quantity } : item
    );
    setCart(updatedCart);
    setCartCount(updatedCart.reduce((total: number, item: CartItem) => total + item.quantity, 0)); // Update cart count
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Save updated cart to localStorage
  };

  // Toggle the selection of an item
  const toggleItemSelection = (productId: string) => {
    const updatedSelectedItems = new Set(selectedItems);
    
    if (updatedSelectedItems.has(productId)) {
      // If item is already selected, unselect it and remove from cart and localStorage
      updatedSelectedItems.delete(productId);

      // Remove item from cart
      const updatedCart = cart.filter(item => item._id !== productId);
      setCart(updatedCart);
      setCartCount(updatedCart.reduce((total: number, item: CartItem) => total + item.quantity, 0)); // Update cart count
      localStorage.setItem('cart', JSON.stringify(updatedCart)); // Save updated cart to localStorage
    } else {
      // If item is not selected, add it to the selection
      updatedSelectedItems.add(productId);
      setSelectedItems(updatedSelectedItems);
    }
  };

  // Calculate total price
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0).toFixed(2);
  };


  return (
    <div className="cart-page h-screen">
      <h2>Your Cart</h2>
      {cart.length > 0 ? (
        <div className="">
          {cart.map((item) => (
            <div key={item._id} className="flex items-center gap-5 bg-gray-100 border-2 max-w-[60%]">
              <input
                type="checkbox"
                checked={selectedItems.has(item._id)} // Make the item checked by default if added to cart
                onChange={() => toggleItemSelection(item._id)}
                className="checkbox"
              />
              <img src={item.image} alt={item.name} className="product-img" />
              <div className="cart-item-details flex-1">
                <h3>{item.name}</h3>
                <p>{item.price}</p>
                <div className="quantity-controls">
                  <button onClick={() => updateQuantity(item._id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
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
        <h3>Total: ${calculateTotal()}</h3>
        <h4>Items in Cart: {cartCount}</h4> {/* Displaying the item count */}
        <button className="checkout-btn bg-[#61300d] text-white px-4 py-2 rounded cursor-pointer">
            Proceed to Checkout
          </button>
      </div>
    </div>
  );
};

export default CartsPage;
