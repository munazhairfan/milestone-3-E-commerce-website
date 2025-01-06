"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type CartProduct = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};
function chkemail(email: string): boolean {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return emailPattern.test(email);
}

// function chknumber(value: string): boolean {
//   const numberPattern = /^[0-9]+$/;
//   return numberPattern.test(value);
// }

// function isNonEmpty(value: string): boolean {
//   return value.trim().length > 0;
// }

function sanitizeInput(value: string): string | null {
  const invalidPattern = /[<>/{}]/;
  if (invalidPattern.test(value)) {
    return null;
  }
  return value.trim();
}

const Cart = () => {
  const [cart, setCart] = useState<CartProduct[]>([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);
  }, []);

  const updateLocalStorage = (updatedCart: CartProduct[]) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const addToCart = (product: CartProduct) => {
    setCart((prevCart) => {
      const productIndex = prevCart.findIndex((item) => item.id === product.id);
      let updatedCart;
      if (productIndex > -1) {
        updatedCart = [...prevCart];
        updatedCart[productIndex].quantity += 1;
      } else {
        updatedCart = [...prevCart, { ...product, quantity: 1 }];
      }

      updateLocalStorage(updatedCart);
      return updatedCart;
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter(
        (product) => product.id !== productId
      );
      updateLocalStorage(updatedCart);
      return updatedCart;
    });
  };

  const updateQuantity = (
    productId: string,
    action: "increase" | "decrease"
  ) => {
    setCart((prevCart) => {
      return prevCart.map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            quantity:
              action === "increase"
                ? product.quantity + 1
                : Math.max(1, product.quantity - 1),
          };
        }
        return product;
      });
    });
  };

  const getTotalPrice = () => {
    return cart
      .reduce((total, product) => total + product.price * product.quantity, 0)
      .toFixed(2);
  };

  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");

  const [errorEmail, setErrorEmail] = useState("");
  const [errorPhoneNumber, setErrorPhoneNumber] = useState("");
  const [errorName, setErrorName] = useState("");
  const [errorCity, setErrorCity] = useState("");
  const [errorAddress, setErrorAddress] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setErrorEmail("");
    setErrorPhoneNumber("");
    setErrorName("");
    setErrorCity("");
    setErrorAddress("");

    const sanitizedEmail = sanitizeInput(email);
    const sanitizedPhoneNumber = sanitizeInput(phoneNumber);
    const sanitizedName = sanitizeInput(name);
    const sanitizedCity = sanitizeInput(city);
    const sanitizedAddress = sanitizeInput(address);

    let formIsValid = true;

    if (!sanitizedName) {
      setErrorName("Name is required.");
      formIsValid = false;
    }

    if (!sanitizedEmail || !chkemail(sanitizedEmail)) {
      setErrorEmail("Please enter a valid email address.");
      formIsValid = false;
    }

    if (!sanitizedPhoneNumber || isNaN(Number(sanitizedPhoneNumber))) {
      setErrorPhoneNumber("Phone number should contain only digits.");
      formIsValid = false;
    }

    if (!sanitizedCity) {
      setErrorCity("City is required.");
      formIsValid = false;
    }

    if (!sanitizedAddress) {
      setErrorAddress("Please Enter a valid Address");
      formIsValid = false;
    }

    if (!formIsValid) {
      return;
    }

    alert("Form submitted successfully!");
    localStorage.removeItem("cart");
  };

  return (
    <div>
      <h2 className="text-center text-3xl font-bold my-5">Shopping Cart</h2>

      {cart.length === 0 ? (
        <div className="ml-4">Your cart is empty.</div>
      ) : (
        cart.map((product) => (
          <div
            key={product.id}
            className="w-full bg-pink-200 h-24 flex items-center justify-evenly mt-5"
          >
            <Image
              src={product.image}
              alt={product.name}
              height={60}
              width={60}
              className="rounded-sm"
            />
            <div className="flex flex-col w-8/12">
              <div className="font-semibold text-pink-950">{product.name}</div>
              <div className="flex w-full justify-between text-slate-500">
                <p>${(product.price * product.quantity).toFixed(2)}</p>
                <div className="flex w-20 justify-between items-center">
                  <button
                    onClick={() => updateQuantity(product.id, "increase")}
                    className="text-white text-xl h-5 w-5 rounded-full bg-pink-700 flex items-center justify-center"
                  >
                    +
                  </button>
                  <div className="number w-8 focus:outline-none border-[3px] border-pink-300 rounded text-black flex items-center justify-center">
                    {product.quantity}
                  </div>
                  <button
                    onClick={() => updateQuantity(product.id, "decrease")}
                    className="text-white text-xl h-5 w-5 rounded-full bg-pink-700 flex items-center justify-center"
                  >
                    -
                  </button>
                </div>
                <button
                  onClick={() => addToCart(product)}
                  className="bg-pink-500 p-2 text-white rounded-md hidden"
                >
                </button>
                <Image
                  src="/delete.png"
                  alt="delete"
                  height={20}
                  width={22}
                  onClick={() => removeFromCart(product.id)}
                />
              </div>
            </div>
          </div>
        ))
      )}

      <div className="mt-5 ml-7 text-xl">
        <div className="font-semibold">Total: ${getTotalPrice()}</div>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <div className="w-full flex justify-center mb-7 mt-7">
            <Button variant="outline">Confirm your order</Button>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm your order</DialogTitle>
            <DialogDescription>
              Please provide the following information
            </DialogDescription>
          </DialogHeader>
          {getTotalPrice() !== "0.00" && (
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    className="col-span-3"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                  {errorName && <p style={{ color: "red" }}>{errorName}</p>}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="city" className="text-right">
                    City
                  </Label>
                  <Input
                    id="city"
                    className="col-span-3"
                    onChange={(e) => setCity(e.target.value)}
                  />
                  {errorCity && <p style={{ color: "red" }}>{errorCity}</p>}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="address" className="text-right">
                    Address
                  </Label>
                  <Input
                    id="address"
                    className="col-span-3"
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  {errorAddress && (
                    <p style={{ color: "red" }}>{errorAddress}</p>
                  )}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phoneNumber" className="text-right">
                    Phone Number
                  </Label>
                  <Input
                    id="phoneNumber"
                    className="col-span-3"
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                    }}
                  />
                  {errorPhoneNumber && (
                    <p style={{ color: "red" }}>{errorPhoneNumber}</p>
                  )}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    className="col-span-3"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  {errorEmail && <p style={{ color: "red" }}>{errorEmail}</p>}
                </div>
              </div>
              <div className="font-semibold">Total: ${getTotalPrice()}</div>
              <Input type="submit"></Input>
            </form>
          )}
          {getTotalPrice() === "0.00" && (
            <>
              <div className="font-semibold">Total: ${getTotalPrice()}</div>
              <p style={{ color: "red" }}>
                Your cart is empty. Please add items to your cart.
              </p>
            </>
          )}
          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Cart;
