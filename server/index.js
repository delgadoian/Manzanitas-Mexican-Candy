// Create an instance of express so we can build our API
const express = require("express");
const router = express.Router();

const cors = require('cors');

// Router for the store's products
const productsRouter = require('./routes/products');

// Router for the store's featured products
const featuredProductsRouter = require('./routes/featuredProducts');

// Router for the auth services
const authRouter = require('./routes/auth.js');

// Login router
const loginRouter = require('./routes/login.js');

// router for saving the users cart
const cartRouter = require('./routes/cart.js');

// Set the instance of express to the variable called app
const app = express();
// Set the PORT constant to whatever port is assigned dynamically or use port 5000 as a fallback
const PORT = process.env.PORT || 5000;

// Middleware for parsing incoming JSON requests. 
app.use(express.json());

// Allow requests to be made from the same origin (locally)
app.use(cors());

// Create the connection to the database
const pool = require('./db');

// The products router
app.use('/products', productsRouter);

// Featured products router
app.use('/featured_products', featuredProductsRouter);

// The login router
app.use('/', loginRouter);

app.use('/', authRouter);

// User cart router
app.use('/api/cart', cartRouter);


pool.connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch(err => console.error('Connection error', err.stack

));

app.get('/', (req, res) => {
    res.send("What up friends!");
});

// Start running the server 
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});