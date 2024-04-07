

import axios from "axios";
import { useEffect, useState } from "react";

export const Confirmation = () => {
  const [verified, setVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

 useEffect(() => {
   if (!verified) {
     console.log("nu körs jag");
     const verifySession = async () => {
       console.log("och jag hoppar in i funktionen");
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
          }
        } catch (error) {
          console.error("Error verifying session:", error);
        }
      }    

     verifySession();
   }
 }, [verified]);


  return (
    <div>
      <h3>{verified && !isLoading ? "TACK FÖR DITT KÖP ✅" : "Loading..."}</h3>
    </div>
  );
};
