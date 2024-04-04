import { useState, useEffect } from "react";
import axios from "axios";

interface ProductData {
  description: string;
  unit_amount: number;
  name: string
  product: {
    id: string;
    name: string;
    images: string;
  };
}

interface CartItem {
  name: string;
  quantity: number;
}

export const ProductList = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    getProducts();
    showCart();
  }, []);

  const getProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/payments/products"
      );

      if (response.status === 200) {
        setProducts(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const addToCart = (item: ProductData) => {
    try {
      const existingCart: CartItem[] =
        JSON.parse(localStorage.getItem("varukorg")) || [];
      let updatedCart: CartItem[] = [...existingCart];
      let alreadyExists = false;

      updatedCart.forEach((cartItem) => {
        if (cartItem.name === item.name) {
          alreadyExists = true;
          cartItem.quantity = cartItem.quantity ? cartItem.quantity + 1 : 1;
        }
      });

      if (!alreadyExists) {
        const checkoutItem: CartItem = {
          name: item.name,
          quantity: 1,
        };
        updatedCart.push(checkoutItem);
      }

      localStorage.setItem("varukorg", JSON.stringify(updatedCart));
      alert("En " + item.name + " har lagts till i din kundvagn!");
      showCart();
    } catch (error) {
      console.error("Error adding item to cart:", error);
      alert("Ett fel uppstod vid tillägg av varan till kundvagnen.");
    }
  };

  const showCart = () => {
    try {
      const existingCart: CartItem[] =
        JSON.parse(localStorage.getItem("varukorg")) || [];
      setCartItems(existingCart);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  return (
    <div>
      <h1>Swedish Fika</h1>
      <div className="product-container">
        {products.map((product) => (
          <div key={product.product.id}>
            <h4>{product.product.name} </h4>
            <img src={product.product.images} alt={product.product.name} />
            <p className="description">{product.description}</p>
            <h4>{product.unit_amount / 100} Kr</h4>
            <button onClick={() => addToCart(product)}>
              Lägg i varukorgen
            </button>
          </div>
        ))}
      </div>
      <div>
        <h2>Din kundvagn</h2>
        <div>
          {cartItems.map((item, index) => (
            <div key={index}>
              {item.name} - Antal: {item.quantity}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
