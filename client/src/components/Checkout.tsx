import{ useState } from "react";
import axios from "axios";

const Checkout = () => {
  const [errorMessage, setErrorMessage] = useState("");

 

  const handleCheckout = async () => {
    const selectedPoint = JSON.parse(
      localStorage.getItem("selectedServicePoint")
    );

    const checkoutItem = JSON.parse(localStorage.getItem("varukorg") || "[]");

    try {
      if (checkoutItem === null || checkoutItem.length === 0) {
        setErrorMessage(
          "Your shopping cart is empty. Please add items before proceeding to checkout."
        );
        return;
      }


      const response = await axios.post(
        "http://localhost:3001/payments/create-checkout-session",
        {
          checkoutItem,
          selectedPoint,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      localStorage.setItem("sessionId", response.data.sessionId);
      window.location = response.data.url;
    } catch (error) {
      console.error("Error during checkout:", error);
    }

    localStorage.removeItem("varukorg");
    localStorage.removeItem("selectedServicePoint");
  };

  return (
    <div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="button-container">
        <button onClick={handleCheckout}>Checkout</button>
      </div>
    </div>
  );
};

export default Checkout;
