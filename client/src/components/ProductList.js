import React, { useState, useEffect } from 'react'
import './ProductList.css'
import axios from 'axios';
// This custom react hook allows us to add items to our cart and keep them there upon loading (They are stored in localStorage for now but we will eventually store them in our DB)
import { useCart } from '../CartContext'

// const tamarind = require("./images/Tamarind_candy.jpg");
// const mazapan = require("./images/Mazapan.webp");
// const duvalin = require("./images/Duvalin.jpg");
// const pulparindo = require("./images/Pulparindo.jpg");

// Placeholder until we make a connection to the database for data
// const sampleProducts = [

//     {id: 1, name: 'Tamarind Candy', price: 2.99, image: tamarind },
//     {id: 2, name: 'Mazapan', price: 3.99, image: mazapan },
//     {id: 3, name: 'Duvalin Candy', price: 0.99, image: duvalin },
//     {id: 4, name: 'Pulparindo', price: 1.99, image: pulparindo }
// ]



// Display each product onto the page
function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addCart } = useCart();

    // Fetch our products from the back end
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const featured_products = await axios.get("http://localhost:5000")
            } catch (err) {
                console.error(`Error fetching featured products data: ${err.message}`);
                setError("Failed to load featured products. ");
                setLoading(false);
            }
        }
    }, []);

  return (
    // Section tag
    <section className="product-list">
        <h3>Featured Products</h3>
        <div className="products">
            {sampleProducts.map((product) => (
                <div key={product.id} className="product-card"> 
                <div>
                    <img src={product.image} alt={product.name} className='product-image'/>
                </div>
                    <h4>{product.name}</h4>
                    <p>${product.price.toFixed(2)}</p>
                    <button className="add-to-cart-button">Add to Cart</button>
                </div>
            ))}
        </div>
    </section>

  )
}

export default ProductList
