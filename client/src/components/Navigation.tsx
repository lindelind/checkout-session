
import {NavLink } from "react-router-dom";

export const Navigation = () => {
  return (
    <>
      <nav>
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/webshop"}>WebShop</NavLink>
        <NavLink to={"/orderhistory"}>Orders</NavLink>
      </nav>
    </>
  );
};