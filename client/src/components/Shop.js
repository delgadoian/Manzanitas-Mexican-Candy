import React, { useState, useEffect } from 'react';
import './Shop.css';
import axios from 'axios'

// For the shopping cart 
import { useCart } from '../CartContext';


function Shop() {
  const [filter, setFilter] = useState('All');

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] =  useState(null);
  const { addToCart } = useCart();
  // Fetch the products from the back-end
  useEffect (() => {
    const fetchProducts = async () => {
      try {
        // The object of the products
        const response = await axios.get('http://localhost:5000/products');
        setProducts(response.data); 
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products: ", err.message);
        setError('Failed to load products.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  

  const filteredProducts = filter === 'All' ? products : products.filter((product) => product.category === filter);

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <section className="shop-page">
      <h1>Shop Our Candies</h1>
      <div className="filter-buttons">
        <button onClick={() => setFilter('All')}>All</button>
        <button onClick={() => setFilter('Peanut Candy')}>Peanut Candy</button>
        <button onClick={() => setFilter('Tamarind Candy')}>Tamarind candy</button>
        <button onClick={() => setFilter('Candy Bags')}>Candy Bags</button>
        <button onClick={() => setFilter('Milk Candy')}>Milk Candy</button>
        <button onClick={() => setFilter('Coconut Candy')}>Coconut Candy</button>
      </div>

      <div className="candy-grid">
          {filteredProducts.map((product) => (
          <div key={product.id} className='candy-card'> 
            
            <img src={product.image} alt={product.name} className="candy-image"/>
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <button className="add-to-cart-button" onClick={ () => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Shop
