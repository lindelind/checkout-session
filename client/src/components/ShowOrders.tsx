import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthProvider";

export const ShowOrders = () => {
  const [orders, setOrders] = useState<OrderData[]>([]);

  const { isLoggedIn, customer } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (isLoggedIn) {
          const response = await axios.get(
            "http://localhost:3001/api/orders/getorders"
          );
          const ordersByCustomers = response.data.filter(
            (order: OrderData) => order.customerEmail === customer?.email
          );
          setOrders(ordersByCustomers);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [isLoggedIn, customer]); 

  return (
    <div>
      <h2>Orders by {customer?.name}</h2>
      {Array.isArray(orders) && orders.length > 0 ? (
        <div>
          <hr />
          {orders.map((order) => (
            <div key={order.orderNumber}>
              <p>
                <b>Order: </b> {order.orderNumber} - <b>Date:</b>{" "}
                {new Date(order.date).toLocaleString()} - <b>Total:</b>{" "}
                {order.total / 100} SEK
              </p>
              <p>Utlämningsställe: {order.servicePoint.service_point}</p>
              <p>
                <b>Products:</b>
              </p>
              <div>
                {order.products.map((product: OrderData) => (
                  <div key={product.id}>
                    {product.description} - {product.quantity} x{" "}
                    {product.price.unit_amount / 100} SEK
                  </div>
                ))}
              </div>
              <hr />
            </div>
          ))}
        </div>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};
