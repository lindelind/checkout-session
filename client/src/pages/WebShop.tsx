import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthProvider"; 
import ProductList from "../components/ProductList";
import Checkout from "../components/Checkout";
import { ShowServicePoints } from "../components/ShowServicePoints";

export const WebShop = () => {
  const navigate = useNavigate();
  const { isLoggedIn, customer, authorize } = useAuth();

  useEffect(() => {}, [authorize, isLoggedIn, customer]);

  const handleLogin = () => {
    navigate("/");
  };

  return (
    <>
      {isLoggedIn ? (
        <>
          <ProductList />
          <ShowServicePoints />
          <Checkout />
        </>
      ) : (
        <div>
          <p>Please log in to access the webshop</p>
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </>
  );
};