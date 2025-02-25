import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../components/AuthProvider";

interface Product {
  description: string;
  quantity: number;
  price: { unit_amount: number };
}

interface ServicePoint {
  service_point: string;
}

interface OrderData {
  orderNumber: string;
  date: string;
  total: number;
  servicePoint: ServicePoint;
  products: Product[];
  customerEmail: string;
}

export const Confirmation = () => {
  const [verified, setVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState<OrderData | null>(null);

  const { isLoggedIn, customer } = useAuth();

  useEffect(() => {
    const verifySession = async () => {
      let sessionId;
      const dataFromLs = localStorage.getItem("sessionId");
      sessionId = dataFromLs;

      console.log("Session ID from localStorage:", sessionId);

      try {
        const response = await axios.post(
          "http://localhost:3001/payments/verify-session",
          {
            sessionId,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Verification response:", response);

        if (response.status === 200) {
          setVerified(response.data.verified);
          setIsLoading(false);

          if (isLoggedIn && customer) {
            try {
              const ordersResponse = await axios.get(
                "http://localhost:3001/api/orders/getorders"
              );
              const customerOrders = ordersResponse.data.filter(
                (order: OrderData) => order.customerEmail === customer.email
              );
              setOrder(customerOrders[0]);

              console.log("Customer orders:", customerOrders);
            } catch (orderError) {
              console.error("Error fetching orders:", orderError);
            }
          }

          localStorage.removeItem("varukorg");
          localStorage.removeItem("selectedServicePoint");
        }
      } catch (error) {
        console.error("Error verifying session:", error);
      }
    };

    if (!verified) {
      verifySession();
    }
  }, [verified, isLoggedIn, customer]);

  return (
    <div className="confirmation">
      <Link to={"/webshop"}>Go back to Webshop</Link>
      <h3>{verified && !isLoading ? "TACK FÖR DITT KÖP ✅" : "Loading..."}</h3>

      {order && !isLoading && verified && (
        <div>
          <h4>Order Summary:</h4>
          <p>
            <b>Order:</b> {order.orderNumber} - <b>Date:</b>{" "}
            {new Date(order.date).toLocaleString()} - <b>Total:</b>{" "}
            {order.total / 100} SEK
          </p>
          <p>
            <b>Servicepoint:</b> {order.servicePoint.service_point}
          </p>

          <h5>Products:</h5>
          <ul>
            {order.products.map((product, index) => (
              <li key={index}>
                {product.description} - {product.quantity} x{" "}
                {product.price.unit_amount / 100} SEK
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
