import { useEffect } from "react";
import { useAuth } from "../components/AuthProvider"; 
import { AuthorizationStatus } from "../components/AuthorizationStatus";
import ProductList from "../components/ProductList";
import Checkout from "../components/Checkout";
import { NavLink } from "react-router-dom";

export const WebShop = () => {
  const { isLoggedIn, customer, authorize} = useAuth(); 

   useEffect(() => {
   }, [authorize, isLoggedIn, customer]);

  return (
    <>
      <NavLink to={"/"}>Tillbaka till startsidan</NavLink>
      <AuthorizationStatus/>
       {isLoggedIn && customer && (
        <>
          <ProductList />
          <Checkout />
        </>
      )}
      </>
  );
};
