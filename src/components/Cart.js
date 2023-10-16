import React, { useState } from 'react';
import './Cart.css';

export default function Cart({ cart, getTotalPrice, removeFromCart }) {

    return (
        <div className="cart">
            <h2>Shopping Cart</h2>
            <div className='cart-item'>
                <ul>
                    {cart.map((product, index) => (
                        <li key={index}>
                            {product.name} - {product.price}
                            <button className="remove-btn" onClick={() => removeFromCart(index)}>X</button>
                        </li>
                    ))}
                </ul>
            </div>
            <p>Total: {getTotalPrice()} $</p>
        </div>
    );
}






