// This file seeds our postgreSQL database
const pool = require('./db');

const seedProducts = async () => {
    const query = `
        INSERT INTO products (name, category, price, image, stock)
        VALUES
            ('Tamarind Ball', 'Tamarind Candy', 2.99, '/images/tamarind-ball.jpg', 160),
            ('Mazapan', 'Peanut Candy', 3.49, '/images/mazapan.jpg', 200),
            ('Coconut Bar', 'Coconut Candy', 1.99, '/images/coconut-bar.jpg', 70),
            ('Assorted Candy Bag', 'Candy Bags', 4.99, '/images/candy-bag.jpg', 10),
            ('Tamarind Stick', 'Tamarind candy', 2.49, '/images/tamarind-stick.jpg', 15),
            ('Peanut Brittle', 'Peanut Candy', 3.99, '/images/peanut-brittle.jpg', 5),
            ('Coconut Lollipop', 'Coconut Candy', 1.49, '/images/coconut-lollipop.jpg', 32);
    
    `;

    try {
        await pool.query(query);
        console.log("Products table successfully seeded!")
    } catch (err) {
        console.error('Error seeding data: ', err.message);
    } finally {
        pool.end();
    }
}

seedProducts();