// Create an instance of express so we can build our API
const express = require("express")

// Set the instance of express to the variable called app
const app = express()
// Set the PORT constant to whatever port is assigned dynamically or use port 5000 as a fallback
const PORT = process.env.PORT || 5000;

// Middleware for parsing incoming JSON requests. 
app.use(express.json())

// Create the connection to the database
const { Pool } = require('pg');
// Load environment variables
require('dotenv').config()

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

pool.connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch(err => console.error('Connection error', err.stack

));

app.get('/', (req, res) => {
    res.send("What up bitches");
});

// Start running the server 
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});