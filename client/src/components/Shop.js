import React, { useState } from 'react';
import './Shop.css';

const tamarind = require("./images/Tamarind_candy.jpg");
const mazapan = require("./images/Mazapan.webp");
const coconut_candy = require("./images/mexican_coconut_candy.jpg");
const mexican_candy_bag = require("./images/candy_bags.jpg");
const tamarind_stick = require("./images/tamarind_stick.jpg");
const peanut_brittle = require("./images/mexican_peanut_brittle.jpg");
const coconut_lolipop = require("./images/coconut_lolipop.jpg")
const duvalin = require("./images/Duvalin.jpg");
const pulparindo = require("./images/Pulparindo.jpg");

// Dummy data
const candies = [
  {id: 1, name: 'Tamarind Ball', type: 'Tamarind candy', price: 2.99, image: tamarind},
  {id: 2, name: 'Mazapan', type: 'Peanut candy', price: 3.49, image: mazapan},
  {id: 3, name: 'Coconut Bar', type: 'Coconut candy', price: 1.99, image: coconut_candy},
  {id: 4, name: 'Assorted Candy Bag', type: 'Candy bags', price: 4.99, image: mexican_candy_bag},
  {id: 5, name: 'Tamarind Stick', type: 'Tamarind candy', price: 2.49, image: tamarind_stick },
  {id: 6, name: 'Peanut Brittle', type: 'Peanut Candy', price: 3.99, image: peanut_brittle},
  {id: 7, name: 'Coconut Lolipop', type: 'Candy bags', price: 4.50, image: coconut_lolipop},
  {id: 8, name: 'Duvalin', type: 'Milk candy', price: 0.99, image: duvalin},
  {id: 9, name: 'pulparindo', type: 'Tamarind candy', price: 0.99, image: pulparindo},
]



function Shop() {
  const [filter, setFilter] = useState('All');

  const handleFilterChange = (type) => {
    setFilter(type);
  }

  const filteredCandies = filter === 'All' ? candies : candies.filter((candy) => candy.type === filter);
  return (
    <section className="shop-page">
      <h1>Shop Our Candies</h1>
      <div className="filter-buttons">
        <button onClick={() => handleFilterChange('All')}>All</button>
        <button onClick={() => handleFilterChange('Peanut candy')}>Peanut Candy</button>
        <button onClick={() => handleFilterChange('Tamarind candy')}>Tamarind candy</button>
        <button onClick={() => handleFilterChange('Candy bags')}>Candy Bags</button>
        <button onClick={() => handleFilterChange('Milk candy')}>Milk Candy</button>
        <button onClick={() => handleFilterChange('Coconut candy')}>Coconut Candy</button>
      </div>
      <div className="candy-grid">
        {filteredCandies.map((candy) => (
          <div key={candy.id} className='candy-card'> 
            <img src={candy.image} alt={candy.name} className="candy-image"/>
            <h3>{candy.name}</h3>
            <p>${candy.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Shop
