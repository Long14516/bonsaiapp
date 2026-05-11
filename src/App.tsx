import React from "react";
import Navigation from "./navigation";
import { CartProvider } from "./navigation/Shopcontext";
const linking = {
  prefixes: ["exp://192.168.1.3:8081"],
  config: {
    screens: {
      Success: "success",
      Fail: "fail",
    },
  },
};
export default function App() {
  return (
    <CartProvider>
      <Navigation />

    </CartProvider>
  );
}