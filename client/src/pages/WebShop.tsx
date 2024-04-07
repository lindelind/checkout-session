import  { useState, useEffect } from "react";
import axios from "axios";
import { AuthorizationStatus } from "../components/AuthorizationStatus";
import ProductList from "../components/ProductList";
import Checkout from "../components/Checkout";

export const WebShop = () => {
  const [customer, setCustomer] = useState("");

  const authorize = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/auth/authorize",
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setCustomer(response.data.email);
      } else {
        setCustomer("");
      }
    } catch (error) {
      console.error("Error during authorization:", error);
    }
  };

  useEffect(() => {
    authorize();
  }, []);

  const logout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/logout",
        null,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setCustomer("");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <>
      <AuthorizationStatus customer={customer} />
      <ProductList />
      <Checkout />
    </>
  );
};
