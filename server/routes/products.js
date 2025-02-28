// Create an instance of express so we can build our API
const express = require("express")
const router = express.Router();

// Create the connection to the database
const pool = require('../db');

router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM "Manzanitas Store".products');
        res.json(result.rows);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Error fetching data. Please try again.");
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM "Manzanitas Store".products WHERE id = $1', [id]);
        res.json(result.rows);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Error fetching data. Please try again.");
    }
});
module.exports = router;