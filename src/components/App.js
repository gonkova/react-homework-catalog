import React, { useState, useEffect } from 'react';
import "./App.css";
import Cart from './Cart';

export default function App() {
    const [products, setProducts] = useState([
        { name: "coffe", category: "Category 1", price: `4 $`, stock: false },
        { name: "potatoes", category: "Category 2", price: `5 $`, stock: true },
        { name: "beer", category: "Category 3", price: `8 $`, stock: true },
        { name: "oranges", category: "Category 4", price: `12 $`, stock: false },
    ]);
    const [initialProducts] = useState(products);
    const [onlyInStock, setOnlyInStock] = useState(false);
    const [cart, setCart] = useState([]);

    function addToCard(product) {
        setCart(prevCart => [...prevCart, product]);
    }

    useEffect(() => {
        if (onlyInStock) {
            const inStockProducts = initialProducts.filter(product => product.stock);
            setProducts(inStockProducts);
        } else {
            setProducts(initialProducts);
        }
    }, [onlyInStock]);

    function renderProducts() {
        return products.map(p => <tr>
            <td>{p.name}</td>
            <td>{p.category}</td>
            <td>{p.price}</td>
            <td >{p.stock ? " In stock" : "Out of Stock"}</td>
            <td> <button className="btn-add"
                onClick={() => addToCard(p)}
            >Add to card</button></td>
        </tr>)
    }

    const getTotalPrice = () => {
        return cart.reduce((total, product) => {
            return total + parseFloat(product.price);
        }, 0);
    };

    function removeFromCart(index) {
        const newCart = [...cart];
        newCart.splice(index, 1);
        setCart(newCart);
    }

    return (
        <div className="App">
            <div className="search-form">
                <input
                    type="text"
                    placeholder="Please enter product name"
                    className="search-input"
                    onInput={(e) => {
                        let input = e.target.value;
                        if (input.length > 0) {

                            const filterProduct = products.filter(product => product.name.includes(input));
                            setProducts([...filterProduct]);
                        }
                        else {
                            setProducts(initialProducts);
                        }
                    }}
                />
                <input type="checkbox"
                    className="search-checkbox"
                    onChange={(e) => setOnlyInStock(e.target.checked)}
                />
            </div>
            <table>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Category</td>
                        <td>Price</td>
                        <td>Stock</td>
                        <td>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="green" class="bi bi-cart-fill" viewBox="0 0 16 16">
                                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                            </svg>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {renderProducts()}
                </tbody>
            </table>
            <Cart
                cart={cart}
                getTotalPrice={getTotalPrice}
                removeFromCart={removeFromCart}
            />
        </div>
    );
}
