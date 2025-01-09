// Create an instance of express so we can build our API
const express = require("express")
const router = express.Router();

// Create the connection to the database
const pool = require('../db');

router.get('/', async (req, res) => {
    const query = `
        SELECT
            p.candy_id, p.name, p.category, p.price, p.image
        FROM
            "Manzanitas Store".featured_products fp
        JOIN
            "Manzanitas Store".products p ON fp.candy_id = p.candy_id
    `;
    try {
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        console.log('Error fetching featured products: ', err.message);
        res.status(500).send("Error fetching data. Please try again.");
    }
});

module.exports = router;