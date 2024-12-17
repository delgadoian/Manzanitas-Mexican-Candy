const express = require('express');
const router = express.Router();

// Connect to our database
const pool = require('../db');

// Get the featured products from the database
router.get("/", async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM "Manzanitas Store".featured_products');
        res.json(result.rows);
    } catch(err) {
        console.log(err.message);
        res.status(500).send("Error fetching data, please try again.");
    }
})

module.exports = router;