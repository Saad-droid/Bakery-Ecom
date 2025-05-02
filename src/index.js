import { createRoot } from "react-dom/client";

import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
import { CartProvider } from "./context/CartContext";
import "bootstrap-icons/font/bootstrap-icons.css";

root.render(
  <>
    <CartProvider>
      <App />
    </CartProvider>
  </>
);
