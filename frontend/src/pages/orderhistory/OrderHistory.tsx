import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAuth } from 'firebase/auth'; // For getting authenticated user
import { useNavigate } from 'react-router-dom'; // For navigation

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderHistory = async () => {
      const user = getAuth().currentUser;
      if (!user) {
        alert("You need to be logged in to view your order history.");
        return;
      }

      const idToken = await user.getIdToken();
      if (!idToken) {
        alert("ID token is missing");
        return;
      }

      try {
        const response = await axios.get(`${import.meta.env.REACT_APP_API_URL}/orders/history`, {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        });

        if (response.status === 200) {
          setOrders(response.data.orders); // Assuming the response contains an orders array
        }
      } catch (error) {
        console.error("Error fetching order history:", error);
        setError('There was an error fetching your order history.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderHistory();
  }, []);

  if (loading) {
    return <div>Loading your order history...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="order-history-container">
      <h1>Your Order History</h1>
      
      {/* If no orders exist */}
      {orders.length === 0 ? (
        <p>You have no past orders.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div className="order-item" key={order.id}>
              <div className="order-header">
                <h3>Order #{order.id}</h3>
                <span>{new Date(order.date).toLocaleDateString()}</span> {/* Format the date */}
              </div>

              <div className="order-details">
                <p><strong>Status:</strong> {order.status}</p>
                <p><strong>Total Cost:</strong> ${order.totalCost}</p>
                <p><strong>Shipping Address:</strong> {order.shippingAddress}</p>
                <p><strong>Order Contents:</strong> {order.items.map(item => `${item.quantity}x ${item.name}`).join(', ')}</p>
              </div>

              {/* View more details or track the order */}
              <button onClick={() => navigate(`/order/${order.id}`)}>View Details</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
