
import {NavLink } from "react-router-dom";
import { AuthorizationStatus } from "./AuthorizationStatus";

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