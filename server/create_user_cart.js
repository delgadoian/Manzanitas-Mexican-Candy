// Create the connection to the database
const pool = require('./db');

const query = `CREATE TABLE "Manzanitas Store".user_cart (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES "Manzanitas Store".users(id) ON DELETE CASCADE NOT NULL,
    candy_id INT REFERENCES "Manzanitas Store".products(candy_id) NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

const createUserCartTable = async () => {
    try {
        await pool.query(query);
        console.log('Successfully created the user_cart table! ^___^');
    } catch (error) {
        console.error('Error creating the user_cart table: ', error.message);
    } finally {
        pool.end(); // Close the connection
    }
};

createUserCartTable();