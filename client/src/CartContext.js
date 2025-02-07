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
        // Get the userId from local storage
        const userId = localStorage.getItem('userId');
        try {
            if (userId) {
                // Save the cart to the backend
                axios.get(`http://localhost:5000/api/cart/get-cart/${userId}`).then((response) => {
                    console.log('Cart response: ', response.data);
                    // Set the cartItems to the response data
                    setCartItems(response.data);
                    // Save the cart to localStorage
                    localStorage.setItem('cart', JSON.stringify(response.data));
                }).catch((error) => console.log('Error getting cart: ', error.message));    
            }
        } catch (error) {
            console.error('Error fetching cart: ', error.message);
        }
        
    }, []);

    // Fetch saved cart from database on Login
    const fetchCart = () => {
        // Get the userId from localStorage
        const userId = localStorage.getItem('userId');
        try {
            // If we have a userId, fetch the cart
            if (userId) {
                console.log("Fetching cart for user: ", userId);
                // Fetch the cart from the backend
                axios.get(`http://localhost:5000/api/cart/get-cart/${userId}`).then((response) => {
                    console.log('Cart response: ', response.data);
                    // Set the cartItems to the response data
                    setCartItems(response.data);
                    // Save the cart to localStorage
                    localStorage.setItem('cart', JSON.stringify(response.data));
                }).catch((error) => console.log('Error getting cart: ', error.message));
            }
        } catch (error) {
            console.error('Error fetching cart: ', error.message);
        }
       
    };

    // Load cart when page loads or when user logs in
    useEffect(() => {
        // fetch cart when component mounts
        fetchCart();
        // Function to handle login success and fetch cart
        const handleLoginSuccess = () => {
            console.log("Login successful, fetching cart");
            fetchCart();
        };
        // Create the event listener for login-successful that will trigger the handleLoginSuccess function when logging in
        window.addEventListener('login-successful', handleLoginSuccess);
        // Remove the event lister after component mounts
        return () => window.removeEventListener('login-successful', handleLoginSuccess);
    }, []);

    // This increases the shopping cart counter
    const addToCart = (product) => {
        // Check if the product is already in the cart
        setCartItems((prevItems) => {
            // Find an existing item by calling the .find() method on the prevItems array
            const existingItem = prevItems.find((item) => item.candy_id === product.candy_id);
            // Conditional that checks if we have an existing item
            if (existingItem) {
                // If we do, we map over the previous items and increment the quantity of the item
                return prevItems.map((item) => 
                item.candy_id === product.candy_id ? {...item, quantity: item.quantity + 1} : item
            );
            } else {
                // If we don't have an existing item, we return a new array with the previous items and the new item
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

    
    // This removes an item from the cart
    const removeFromCart = (productId) => {
        // Filter out the item with the matching candy_id
        setCartItems((prevItems) => 
            prevItems.filter((item) => item.candy_id !== productId)
        );
    };
    // This clears the cart
    const clearCart = () => {
        // Set the cartItems to an empty array
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

