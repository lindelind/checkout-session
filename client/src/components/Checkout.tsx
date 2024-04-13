import axios from "axios";

const Checkout = () => {
 
  const handleCheckout = async () => {
    const selectedPoint = JSON.parse(
      localStorage.getItem("selectedServicePoint") || "[]"
    );
    console.log(selectedPoint);

    const checkoutItem = JSON.parse(localStorage.getItem("varukorg") || "[]");

    try {
      if (!checkoutItem) {
        console.error("No item in cart to checkout");
        return;
      }

      if (!selectedPoint) {
        console.error("No selected service point");
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

    localStorage.removeItem("cartItems");
    localStorage.removeItem("servicePoint");

  };

  return (
    <div>
      <div className="button-container">
        <button onClick={handleCheckout}>Checkout</button>
      </div>
    </div>
  );
};

export default Checkout;
