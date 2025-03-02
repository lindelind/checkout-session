import { useState, useEffect } from "react";
import axios from "axios";

interface ProductData {
  price: string;
  description: string;
  unit_amount: number;
  name: string;
  product: {
    default_price: any;
    id: string;
    name: string;
    images: string;
  };
}

interface CartItem {
  priceData: number;
  name: string;
  quantity: number;
  price: string;
}

export const ProductList = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    getProducts();
    showCart();
  }, []);

  useEffect(() => {
    calculateTotal();
  }, [cartItems]);

  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3001/payments/products");

      if (response.status === 200) {
        const activeProducts = response.data.data.filter((product: ProductData) => product.product.active);
        setProducts(activeProducts);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const addToCart = (item: ProductData) => {
    try {
      const existingCart: CartItem[] = JSON.parse(localStorage.getItem("varukorg") || "[]");
      let updatedCart: CartItem[] = [...existingCart];
      let alreadyExists = false;

      updatedCart.forEach((cartItem) => {
        if (cartItem.name === item.product.name) {
          alreadyExists = true;
          cartItem.quantity = cartItem.quantity ? cartItem.quantity + 1 : 1;
        }
      });

      if (!alreadyExists) {
        const checkoutItem: CartItem = {
          price: item.product.default_price,
          name: item.product.name,
          priceData: item.unit_amount,
          quantity: 1,
        };
        updatedCart.push(checkoutItem);
      }

      localStorage.setItem("varukorg", JSON.stringify(updatedCart));
      alert("En " + item.product.name + " har lagts till i din kundvagn!");
      showCart();
    } catch (error) {
      console.error("Error adding item to cart:", error);
      alert("Ett fel uppstod vid tillägg av varan till kundvagnen.");
    }
  };

  const calculateTotal = () => {
    let totalAmount = 0;
    cartItems.forEach((item) => {
      totalAmount += (item.quantity * item.priceData) / 100;
    });
    setTotal(totalAmount);
  };

  const showCart = () => {
    try {
      const existingCart: CartItem[] = JSON.parse(localStorage.getItem("varukorg") || "[]");
      setCartItems(existingCart);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  return (
    <div>
      <div className="product-container">
        {products.map((product) => (
          <div className="product-card" key={product.product.id}>
            <h4>{product.product.name}</h4>
            <img src={product.product.images} alt={product.product.name} />
            <p className="description">{product.description}</p>
            <h4>{product.unit_amount / 100} Kr</h4>
            <button className="cart-btn" onClick={() => addToCart(product)}>
              Add to cart
            </button>
          </div>
        ))}
      </div>
      <div className="cart-container">
        <h2>Cart</h2>
        <div>
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <div key={index}>
                {item.name} - {item.quantity} x {item.priceData / 100} SEK
              </div>
            ))
          ) : (
            <p>No items in cart</p>
          )}
          <div>
            <h4>Total amount: {total.toFixed(2)} SEK</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
