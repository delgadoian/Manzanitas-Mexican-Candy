// This file seeds our postgreSQL database
const pool = require('./db');

const seedProducts = async () => {
    const query = `
        INSERT INTO "Manzanitas Store".featured_products (name, category, price, image, stock)
        VALUES
            ('Tamarind Ball', 'Tamarind Candy', 2.99, '/images/tamarind_candy.jpg', 160),
            ('Mazapan', 'Peanut Candy', 3.49, '/images/Mazapan.webp', 200),
            ('Pulparindo', 'Tamarind Candy', 0.99, '/images/mexican_peanut_brittle.jpg', 5),
            ('Duvalin', 'Milk Candy', 0.99, '/images/Duvalin.jpg', 5);
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