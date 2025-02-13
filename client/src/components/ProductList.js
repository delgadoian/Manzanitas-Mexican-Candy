
import React, {useState, useEffect} from 'react'
import './ProductList.css'
import axios from 'axios';
import { useCart } from '../CartContext'
// Custom hook allows us to add items to our cart and keep them there upon loading (They are stored in localStorage for now but will eventually stored in our DB)

// Display each product onto the page
function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const {addToCart } = useCart();


    // Fetch the products from the back end
    useEffect(() => {
            const fetchProducts = async () => {
                try {
                    const featured_products = await axios.get("http://localhost:5000/featured_products");
                    setProducts(featured_products.data);
                    setLoading(false);
                } catch (error) {
                    console.error(`Error fetching featured products data: ${error.message}`);
                    setError("Failed to load featured products.");
                    setLoading(false);
                }
            }
            fetchProducts();
    }, [])

    if (loading) return <div>Loading Featured Products...</div>
    
    if (error) return <div>{error}</div>

    return (
        // Section tag
        <section className="product-list">
            <h3>Featured Products</h3>
            <div className="products">
                {products.map((product) => (              
                    <div key={product.id} className="product-card"> 
                    <div>
                        <img src={product.image} alt={product.name} className='product-image'/>
                    </div>
                        <h4>{product.name}</h4>
                        <p>${product.price}</p>
                        <button className="add-to-cart-button" onClick={ () => addToCart(product)}>Add to Cart</button>
                    </div>
                ))}
            </div>
        </section>

    )
}

export default ProductList
