import React from 'react'
import { useCart } from '../CartContext.js';
import './CartPage.css'


function CartPage() {
    const { cartItems, removeFromCart, clearCart } = useCart();

    const totalPrice = cartItems.reduce (
        (total, item) => total + item.price * item.quantity, 0
    );
    return (
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
                                    <button onClick={() => removeFromCart(item.id)}>Remove</button>
                                </div>
                            </li>
                        ))}

                    </ul>
                    <h2>Total: ${totalPrice.toFixed(2)}</h2>
                    <button onClick={clearCart}>Clear Cart</button>
                </>
            )}
        </section>
    );
}

export default CartPage
