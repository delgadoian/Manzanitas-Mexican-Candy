// This file seeds our postgreSQL database
const pool = require('./db');

const seedProducts = async () => {
    const query = `
        INSERT INTO "Manzanitas Store".products (name, category, price, image, stock)
        VALUES
            ('Tamarind Ball', 'Tamarind Candy', 2.99, '/images/tamarind_candy.jpg', 160),
            ('Mazapan', 'Peanut Candy', 3.49, '/images/Mazapan.webp', 200),
            ('Coconut Bar', 'Coconut Candy', 1.99, '/images/mexican_coconut_candy.jpg', 70),
            ('Assorted Candy Bag', 'Candy Bags', 4.99, '/images/candy_bag.jpg', 10),
            ('Tamarind Stick', 'Tamarind candy', 2.49, '/images/tamarind_stick.jpg', 15),
            ('Peanut Brittle', 'Peanut Candy', 3.99, '/images/mexican_peanut_brittle.jpg', 5),
            ('Pulparindo', 'Tamarind Candy', 0.99, '/images/mexican_peanut_brittle.jpg', 5),
            ('Duvalin', 'Milk Candy', 0.99, '/images/Duvalin.jpg', 5),
            ('Coconut Lollipop', 'Coconut Candy', 1.49, '/images/coconut_lolipop.jpg', 32);
    
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