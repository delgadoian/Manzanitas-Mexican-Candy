import React, {createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const CartContext =  createContext();
// The useCart hook is what will increment our shopping cart counter when a user adds an item to the cart
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    
    const [cartItems, setCartItems] = useState([]);

   
    // Fetch cart from database
    const fetchCartFromDatabase = async () => {
        const userId = localStorage.getItem('userId');

        if (userId) {
            try {
                console.log("Fetching cart for user: ", userId);
                const response = await axios.get(`http://localhost:5000/api/cart/get-cart/${userId}`);

                if (response.data.length > 0) {
                    setCartItems(response.data);
                    localStorage.setItem('cart', JSON.stringify(response.data));
                } else {
                    console.log("No cart items found in database, keeping local cart.");
                }
            } catch (error) {
                console.error('Error fetching cart: ', error.message);
            }
        }
    };

    // Function to save cart to the database
    const saveCartToDatabase = async (cartItems) => {
        console.log("Saving cart to database");
        const userId = localStorage.getItem('userId');
        if (userId && cartItems.length > 0) {
            try {
                await axios.post('http://localhost:5000/api/cart/save-cart', {
                    userId,
                    cartItems
                }).then(() => console.log('Cart saved successfully')).catch((error) => console.error('Error saving cart: ', error.message));
            } catch (error) {
                console.error('Error saving cart: ', error.message);
            
            }
        }
    };

    // Load cart from localStorage on page load
    useEffect(() => {
        const localCart = JSON.parse(localStorage.getItem('cart')) || [];
        
        if (localCart.length > 0) {
            console.log("loading cart from localStorage: ", localCart);
            setCartItems(localCart);
        } else {
            fetchCartFromDatabase(); // Fetch cart from database if not in localStorage
            console.log("No cart items found in localStorage");
        }
    }, []);

    // Save cart to localStorage and database on change
    useEffect(() => {
        
        if (cartItems.length > 0) {
            localStorage.setItem('cart', JSON.stringify(cartItems));
            saveCartToDatabase(cartItems);
        }
        
    }, [cartItems]);

    // EDIT THIS USEEFFECT

    

    // fetch cart from database on login and page load
    useEffect(() => {
        const handleLoginSuccess = () => {
            console.log("Login successful, fetching cart");
            fetchCartFromDatabase();
        };
        
        window.addEventListener('login-successful', handleLoginSuccess);
        return () => window.removeEventListener('login-successful', handleLoginSuccess);
    }, []);



    // Clear local storage on logout
    useEffect(() => { 
        console.log("In the useEffect for logout");
        const handleLogout = () => {
            console.log("Logging out, clearing cart");
            setCartItems([]);
            localStorage.removeItem('cart');
        };

        window.addEventListener('logout', handleLogout);
        return () => window.removeEventListener('logout', handleLogout);
    },[]);
    

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
        console.log(`ProductId: ${productId}`);
        // Check if the current item's candy_id matches the productID and if so, create a new object but increment the item quantity by 1
        setCartItems((prevItems) => prevItems.map((item) => item.candy_id === productId ? {...item, quantity: item.quantity + 1} : item))
        localStorage.setItem('cart', JSON.stringify(cartItems));
    };

    // For the cart page, decrease the quantity of the item
    const decreaseQuantity = async (productId) => {
       setCartItems((prevItems) => {
        const updatedCart = prevItems.map((item) => item.candy_id === productId ? {...item, quantity: item.quantity - 1} : item)
        .filter((item) => item.quantity > 0); // Remove items with quantity 0
        
        // Update localStorage
        localStorage.setItem('cart', JSON.stringify(updatedCart));

        // If the cart is now empty, clear it from the database
        if (updatedCart.length === 0) {
            clearCart();
    
        } else {
            saveCartToDatabase(updatedCart);
        } 
        return updatedCart;
       });
    };

    
    // This removes an item from the cart
    const removeFromCart = (productId) => {
        // Filter out the item with the matching candy_id
        setCartItems((prevItems) => 
            prevItems.filter((item) => item.candy_id !== productId)
        );
        console.log(`Remove from cart: ${productId}`);
        if (cartItems.length === 0) {
            clearCart();
        } else {
            
            localStorage.setItem('cart', JSON.stringify(cartItems));
        }
    };
    // This clears the cart
    const clearCart = async() => {

        // Clear the cart from the backend if user is logged in
        const userId = localStorage.getItem('userId');
        console.log(`In the clearCart function, userId: ${userId}`);
        if (userId) {
            try {
                await axios.post('http://localhost:5000/api/cart/clear-cart', 
                    {userId});
            } catch (error) {
                console.error('Error clearing cart: ', error.message);
            }
            
        }

        // Clear local cart and localStorage
        setCartItems([]);
        localStorage.removeItem('cart');
    };

    return (
        // Provides access to the cartCount and the addToCart values to the child components
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    )
};

