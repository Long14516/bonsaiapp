import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
const BASE_URL =
  "https://voucher-overbill-aftermost.ngrok-free.dev";

type CartItem = {
  id: number;
  productId: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
  };
};

type CartContextType = {
  cart: CartItem[];

  addToCart: (productId: number) => Promise<void>;
  increase: (id: number) => Promise<void>;
  decrease: (id: number) => Promise<void>;
  removeItem: (id: number) => Promise<void>;
  clearCart: () => Promise<void>;
  loadCart: () => Promise<void>;
  reloadCart: () => void; // ✅ FIX
};

const CartContext =
  createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: any) => {
  const [cart, setCart] = useState<CartItem[]>([]);

const getUserId = async () => {

  try {

    const userString =
      await AsyncStorage.getItem("user");

    if (!userString) {
      return null;
    }

    const user =
      JSON.parse(userString);

    return user.id;

  } catch (err) {

    console.log(
      "GET USER ERROR:",
      err
    );

    return null;
  }
};
  // ================= LOAD CART =================
const loadCart = async () => {

  try {

    const userId =
      await getUserId();

    if (!userId) {
      setCart([]);
      return;
    }

    const res = await fetch(
      `${BASE_URL}/api/cart/${userId}`,
      {
        headers: {
          "ngrok-skip-browser-warning":
            "true",
        },
      }
    );

    const data =
      await res.json();

    const items =
      data.cartItems?.$values ||
      data.cartItems ||
      [];

    setCart([...items]);

  } catch (err) {

    console.log(
      "LOAD CART ERROR:",
      err
    );
  }
};
  // ================= ADD =================
  const addToCart = async (
  productId: number
) => {

  const userId =
    await getUserId();

  if (!userId) return;

  await fetch(
    `${BASE_URL}/api/cart/add`,
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",

        "ngrok-skip-browser-warning":
          "true",
      },

      body: JSON.stringify({
        userId,
        productId,
      }),
    }
  );

  await loadCart();
};
  // ================= INCREASE =================
  const increase = async (id: number) => {
    await fetch(`${BASE_URL}/api/cart/increase/${id}`, {
      method: "PUT",
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    });

    await loadCart();
  };

  // ================= DECREASE =================
  const decrease = async (id: number) => {
    await fetch(`${BASE_URL}/api/cart/decrease/${id}`, {
      method: "PUT",
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    });

    await loadCart();
  };

  // ================= REMOVE =================
  const removeItem = async (id: number) => {
    await fetch(`${BASE_URL}/api/cart/${id}`, {
      method: "DELETE",
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    });

    await loadCart();
  };

const clearCart = async () => {

  try {

    const userId =
      await getUserId();

    if (!userId) return;

    setCart([]);

    await fetch(
      `${BASE_URL}/api/cart/clear/${userId}`,
      {
        method: "DELETE",

        headers: {
          "ngrok-skip-browser-warning":
            "true",
        },
      }
    );

  } catch (err) {

    console.log(
      "CLEAR CART ERROR:",
      err
    );
  }
};
  // ================= RELOAD =================
  const reloadCart = () => {
    loadCart();
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increase,
        decrease,
        removeItem,
        clearCart,
        loadCart,
        reloadCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
};