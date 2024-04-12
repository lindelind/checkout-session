
import {NavLink } from "react-router-dom";

export const Navigation = () => {
  return (
    <>
      <nav>
        <NavLink to={"/"}>Start</NavLink>
        <NavLink to={"/webshop"}>WebShop</NavLink>
        <NavLink to={"/orderhistory"}>Mina ordrar</NavLink>
      </nav>
    </>
  );
};