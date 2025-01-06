import { createContext, useContext, useState, ReactNode } from "react";

type CartProduct = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

interface CartContextType {
  cart: CartProduct[];
  addToCart: (product: CartProduct) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, action: 'increase' | 'decrease') => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartProduct[]>(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const addToCart = (product: CartProduct) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((product) => product.id !== productId));
  };

  const updateQuantity = (productId: string, action: "increase" | "decrease") => {
    setCart((prevCart) =>
      prevCart.map((product) =>
        product.id === productId
          ? {
              ...product,
              quantity: action === "increase" ? product.quantity + 1 : Math.max(1, product.quantity - 1),
            }
          : product
      )
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
