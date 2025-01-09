import React, {createContext, useState, useContext, useEffect } from 'react';


const CartContext =  createContext();
// The useCart hook is what will increment our shopping cart counter when a user adds an item to the cart
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    // Load cart from LocalStorage
    const initalCart = JSON.parse(localStorage.getItem('cart')) || [];
    const [cartItems, setCartItems] = useState([]);

    // Save the cart to localStorage when there is a change
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    // This increases the shopping cart counter
    const addToCart = (product) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id === product.candy_id);
            if (existingItem) {
                return prevItems.map((item) => 
                item.id === product.candy_id ? {...item, quantity: item.quantity + 1} : item
            );
            } else {
                return [...prevItems,  { ...product, quantity: 1}];
            }
        });
    };

    const removeFromCart = (productId) => {
        setCartItems((prevItems) => 
            prevItems.filter((item) => item.candy_id !== productId)
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        // Provides access to the cartCount and the addToCart values to the child components
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    )
};

