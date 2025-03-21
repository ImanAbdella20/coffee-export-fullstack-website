import React from 'react';

const OrderHistory = () => {
  const orders = [
    {
      id: '12345',
      date: '2025-03-15',
      total: '120.50 br',
      status: 'Delivered',
      items: [
        { name: 'Ethiopian Coffee Beans', quantity: 2, price: '20.00 br' },
        { name: 'Espresso Machine', quantity: 1, price: '80.50 br' },
      ],
      shippingAddress: '123 Coffee Lane, Addis Ababa, Ethiopia',
    },
    // Add more orders here
  ];

  return (
    <div className="h-screen p-4">
      <h1 className="text-2xl font-bold">Order History</h1>
      {orders.map(order => (
        <div key={order.id} className="border p-4 my-4 rounded shadow">
          <h2 className="text-lg font-semibold">Order ID: {order.id}</h2>
          <p>Date: {order.date}</p>
          <p>Total: {order.total}</p>
          <p>Status: {order.status}</p>
          <p>Shipping Address: {order.shippingAddress}</p>
          <h3 className="font-semibold mt-2">Items:</h3>
          <ul>
            {order.items.map((item, index) => (
              <li key={index}>
                {item.quantity}x {item.name} - {item.price}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;
