import axios from "axios";
import { redirect } from "react-router-dom";
import { useAuth } from "./AuthProvider";


const Checkout = () => {

   const { isLoggedIn, customer } = useAuth();

  const handleCheckout = async () => {
    try {
      const checkoutItem = JSON.parse(localStorage.getItem("varukorg")|| "[]");
      console.log(checkoutItem);

      if (!checkoutItem) {
        console.error("No item in cart to checkout");
        return;
      }

      // if(!isLoggedIn) {
      //    return redirect ("/");
      // }


      const response = await axios.post(
        "http://localhost:3001/payments/create-checkout-session",
        checkoutItem,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      localStorage.setItem("sessionId", response.data.sessionId)
      window.location = response.data.url;
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <div>
      <h1>Payment</h1>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
};

export default Checkout;
