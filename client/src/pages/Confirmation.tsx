

import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Confirmation = () => {
  const [verified, setVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

 useEffect(() => {
   if (!verified) {
     const verifySession = async () => {
       let sessionId;
       const dataFromLs = localStorage.getItem("sessionId");
        sessionId = dataFromLs;

        try {
          const response = await axios.post("http://localhost:3001/payments/verify-session", {
            sessionId
          }, {
            headers: {
              "Content-Type": "application/json"
            }
          });

          if (response.status === 200) {
            setVerified(response.data.verified);
            setIsLoading(false);

            localStorage.removeItem("varukorg");
            localStorage.removeItem("selectedServicePoint");
            
          }
        } catch (error) {
          console.error("Error verifying session:", error);
        }
      }    

     verifySession();
   }
 }, [verified]);


  return (
    <div className="confirmation">
      <Link to={"/webshop"}>Go back to Webshop</Link>
      <h3>{verified && !isLoading ? "TACK FÖR DITT KÖP ✅" : "Loading..."}</h3>
    </div>
  );
};
