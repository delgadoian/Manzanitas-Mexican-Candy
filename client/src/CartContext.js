import React, {createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const CartContext =  createContext();
// The useCart hook is what will increment our shopping cart counter when a user adds an item to the cart
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    // Load cart from LocalStorage
    const initialCart = JSON.parse(localStorage.getItem('cart')) || [];
    const [cartItems, setCartItems] = useState(initialCart);

    // Save cart to Local Storage whenever cartItems change
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    // Clear cart when user logs out
    useEffect(() => {
        const handleLogout = () => {
            console.log("User logging out, clearing cart");
            setCartItems([]); // Updates the cart to be empty
        };

        window.addEventListener('storage', handleLogout);
        return () => window.removeEventListener('storage', handleLogout);
    }, []);

  

    // Save the cart to localStorage when there is a change
    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            axios.get(`http://localhost:5000/api/cart/get-cart/${userId}`).then((response) => {
                console.log('Cart response: ', response.data);
                setCartItems(response.data);
                localStorage.setItem('cart', JSON.stringify(response.data));
            }).catch((error) => console.log('Error getting cart: ', error.message));    
        }
    }, []);

    // This increases the shopping cart counter
    const addToCart = (product) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.candy_id === product.candy_id);
            if (existingItem) {
                return prevItems.map((item) => 
                item.candy_id === product.candy_id ? {...item, quantity: item.quantity + 1} : item
            );
            } else {
                return [...prevItems,  { ...product, quantity: 1}];
            }
        });
    };

    // For the cart page, increases the quantity of the item
    const increaseQuantity = (productId) => {
        // Check if the current item's candy_id matches the productID and if so, create a new object but increment the item quantity by 1
        setCartItems((prevItems) => prevItems.map((item) => item.candy_id === productId ? {...item, quantity: item.quantity + 1} : item))
    };

    // For the cart page, decrease the quantity of the item
    const decreaseQuantity = (productId) => {
        // Check if the current item's candy_id matches the productID and if so, create a new object but decrement the item quantity by 1
        setCartItems((prevItems) => prevItems.map((item) => item.candy_id === productId && item.quantity >= 1 ? {...item, quantity: item.quantity - 1} : item).filter((item) => item.quantity > 0));
    };

    

    const removeFromCart = (productId) => {
        setCartItems((prevItems) => 
            prevItems.filter((item) => item.candy_id !== productId)
        );
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cart'); // Remove cart from localStorage
    };

    return (
        // Provides access to the cartCount and the addToCart values to the child components
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    )
};

