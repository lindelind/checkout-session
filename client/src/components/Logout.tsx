import axios from "axios";
import { useState } from "react";

export const Logout = () => {

const handleLogout = async () => {
   const [user, setUser] = useState("");

   const response = await axios.post(
     "http://localhost:3001/api/auth/logout",
     null,
     {
       withCredentials: true,
     }
   );

   if (response.status === 200) {
     setUser("");
   }
 };

 return (
    <button onClick={handleLogout}></button>
 )
};