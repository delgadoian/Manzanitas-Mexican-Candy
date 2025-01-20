// Create the connection to the database
const pool = require('./db');

const query = `
    CREATE TABLE "Manzanitas Store".users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, -- Store hashed passwords
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

`
const createUsersTable = async () => {
    try {
        await pool.query(query);
        console.log('Successfully created the users table! ^___^');
    } catch (err) {
        console.error('Error creating the users table: ', err.message);
    } finally {
        pool.end() // Close the connection
    }
    
};

createUsersTable();