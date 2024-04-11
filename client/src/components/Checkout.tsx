import axios from "axios";

const Checkout = () => {

const checkoutItem = JSON.parse(localStorage.getItem("varukorg")|| "[]");
      console.log(checkoutItem);
      
  const selectedPoint = JSON.parse(
      localStorage.getItem("selectedServicePoint"))
      console.log(selectedPoint)

  const handleCheckout = async () => {
    try {
      
      if (!checkoutItem) {
        console.error("No item in cart to checkout");
        return;
      }

      //lägg till om kund ej är inloggad: skicka vidare till start/inloggningssida

      const response = await axios.post(
        "http://localhost:3001/payments/create-checkout-session",
        {
          checkoutItem,
          selectedPoint
        },
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
