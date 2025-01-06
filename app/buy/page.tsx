"use client"
import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

const CheckoutPage = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [total, setTotal] = useState<number>(0);
    // const navigate = useNavigate();

    useEffect(() => {
        const storedCartItems = localStorage.getItem("cartItems");
        if (storedCartItems) {
            const items = JSON.parse(storedCartItems);
            setCartItems(items);
        }
    }, []);

    useEffect(() => {
        const totalPrice = cartItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );
        setTotal(totalPrice);
    }, [cartItems]);

    const handleConfirmPurchase = () => {
        alert("Purchase confirmed! (Payment not integrated)");
        localStorage.removeItem("cartItems");
        setCartItems([]);
        // navigate("/"); 
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>

            <div className="cart-items mb-6">
                {cartItems.length === 0 ? (
                    <p className="text-gray-500 text-center">Your cart is empty. Please add items to the cart first.</p>
                ) : (
                    cartItems.map((item) => (
                        <div key={item.id} className="cart-item p-4 mb-4 border-b border-gray-200">
                            <h3 className="text-xl font-semibold">{item.name}</h3>
                            <p className="text-gray-700">Price: <span className="font-semibold">${item.price}</span></p>
                            <p className="text-gray-700">Quantity: <span className="font-semibold">{item.quantity}</span></p>
                            <p className="text-gray-700">Total: <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span></p>
                        </div>
                    ))
                )}
            </div>

            <div className="total mb-6 text-right">
                <h3 className="text-2xl font-semibold">Total: <span className="text-green-600">${total.toFixed(2)}</span></h3>
            </div>

            <div className="confirm-purchase text-center">
                <button
                    onClick={handleConfirmPurchase}
                    disabled={cartItems.length === 0}
                    className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-300"
                >
                    {cartItems.length === 0 ? "No items in cart" : "Confirm Purchase"}
                </button>
            </div>
        </div>
    );
};

export default CheckoutPage;
