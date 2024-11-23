import React from 'react'
import './ProductList.css'

const tamarind = require("./images/Tamarind_candy.jpg");
const mazapan = require("./images/Mazapan.webp");
const duvalin = require("./images/Duvalin.jpg");
const pulparindo = require("./images/Pulparindo.jpg");

// Placeholder until we make a connection to the database for data
const sampleProducts = [

    {id: 1, name: 'Tamarind Candy', price: 2.99, image: tamarind },
    {id: 2, name: 'Mazapan', price: 3.99, image: mazapan },
    {id: 3, name: 'Duvalin Candy', price: 0.99, image: duvalin },
    {id: 4, name: 'Pulparindo', price: 1.99, image: pulparindo }
]

// Display each product onto the page
function ProductList() {
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
