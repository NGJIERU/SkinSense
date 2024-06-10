import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../general/UserContext';
import axios from 'axios';
import './myOrder.css'; // Import the CSS file

function MyOrder() {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(UserContext); // Get the logged-in user's info

  useEffect(() => {
    const fetchOrdersAndStatus = async () => {
      const userId = JSON.parse(localStorage.getItem("userId"));
      if (!userId) {
        console.error('User ID is missing');
        return;
      }

      try {
        // Fetch orders and all seller orders in parallel
        const [ordersResponse, sellerOrdersResponse] = await Promise.all([
          axios.get(`http://localhost:4000/orders?userId=${userId}`),
          axios.get(`http://localhost:4000/sellerorders/user?userId=${userId}`)
        ]);

        const orders = ordersResponse.data;
        const sellerOrders = sellerOrdersResponse.data;

        // Merge the delivery status from seller orders into the orders
        const ordersWithStatus = orders.map(order => {
          // Find matching seller order based on itemId and sellerID
          const matchingSellerOrder = sellerOrders.find(sellerOrder => sellerOrder.itemId === order.itemId && sellerOrder.userId === userId);
          return {
            ...order,
            deliveryStatus: matchingSellerOrder ? matchingSellerOrder.deliveryStatus : order.deliveryStatus
          };
        });

        console.log('Fetched orders with merged status:', ordersWithStatus);
        setOrders(ordersWithStatus);
      } catch (error) {
        console.error('Error fetching orders or status:', error);
      }
    };

    fetchOrdersAndStatus();
  }, [user]);

  return (
    <div className='MyOrder'>
      <header className='header'>
        <h1>Orders</h1>
      </header>
      <div className='ordertable'>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Created At</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Payment Method</th>
              <th>Delivery Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map(order => (
                <tr key={order._id}>
                  <td>{order.name}</td>
                  <td>{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}</td>
                  <td>${order.price ? order.price.toFixed(2) : '0.00'}</td>
                  <td>{order.quantity || '0'}</td>
                  <td>${(order.price * order.quantity).toFixed(2)}</td>
                  <td>
                    <span className={`payment-method ${order.paymentMethod ? order.paymentMethod.toLowerCase() : 'unknown'}`}>
                      {order.paymentMethod || 'N/A'}
                    </span>
                  </td>
                  <td>
                    <span className={`status ${order.deliveryStatus ? order.deliveryStatus.toLowerCase() : 'processing'}`}>
                      {order.deliveryStatus || 'Processing'}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No orders found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyOrder;
