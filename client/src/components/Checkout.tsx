import axios from "axios";

const Checkout = () => {
  const handleCheckout = async () => {
    try {
      const checkoutItem = JSON.parse(localStorage.getItem("varukorg"));
      console.log(checkoutItem);

      if (!checkoutItem) {
        console.error("No item in cart to checkout");
        return;
      }

    //   if (!isLoggedIn) {
    //     console.error("Customer not logged in");
    //     //omdirigera användaren till inloggnings-/registreringssidan
    //     return;
    //   }

      const response = await axios.post(
        "http://localhost:3001/payments/create-checkout-session",
        checkoutItem,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

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
