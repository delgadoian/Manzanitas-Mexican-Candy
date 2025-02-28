import React from 'react'
import { useCart } from '../CartContext.js';
import './CartPage.css'


function CartPage() {
    const { cartItems, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useCart();

    const totalPrice = cartItems.reduce (
        (total, item) => total + item.price * item.quantity, 0
    );
    return (
        <div className="cart-page-container">
            <section className='cart-page'>
                <h1>Your Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <>
                        <ul className="cart-list">
                            {cartItems.map((item) => (
                                <li key={item.id} className="cart-item">
                                    <img src={item.image} alt={item.name} className="cart-item-image"/>
                                    <div className="cart-item-details">
                                        <h3>{item.name}</h3>
                                        <p>Price: ${item.price}</p>
                                        <p>Quantity: {item.quantity}</p>
                                        <div className="quantity-controls">
                                            <button className="increase-button" onClick={() => increaseQuantity(item.candy_id)}>+</button>
                                            <button className="decrease-button" onClick={() => decreaseQuantity(item.candy_id)}>-</button>
                                            <button className="remove-button"onClick={() => removeFromCart(item.candy_id)}>Remove</button>
                                        </div>
                                        
                                    </div>
                                </li>
                            ))}

                        </ul>
                        <h2>Total: ${totalPrice.toFixed(2)}</h2>
                        <button onClick={clearCart}>Clear Cart</button>
                    </>
                )}
            </section>
        </div>
    );
}

export default CartPage
