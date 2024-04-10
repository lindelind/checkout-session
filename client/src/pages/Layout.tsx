import { Outlet } from "react-router-dom";
import "../styles/main.scss"
import { Navigation } from "../components/Navigation";
import AuthorizationStatus from "../components/AuthorizationStatus";

export const Layout = () => {

     return (
       <>
         <header>
           <Navigation />
         </header>
         <main>
           <Outlet />
         </main>
         <footer></footer>
       </>
     );
}