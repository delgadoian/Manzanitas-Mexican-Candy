const express = require("express");
const pool = require('../db');
const router = express.Router();

// Save the cart to the database
router.post('/save-cart', async (req, res) => {

    const { userId, cartItems } = req.body;
    console.log("Received userId: ", userId);
    console.log("Received cartItems: ", cartItems);

    try {
        // Check if userId and cartItems are provided
        if (!userId) {
            console.error('No userId provided');
            return res.status(400).json({error: 'No userId provided'});
        }
        // Check if cart items is an array
        if (!Array.isArray(cartItems)) {

            console.error('Cart items is not an array: ', cartItems);
            return res.status(400).json({error: 'Cart items is not an array'});
        }

        try {
            // Use a transaction to update each item in the cart
            await pool.query('BEGIN');
            // Check if the cart is not empty
            if (cartItems.length > 0) {
                // Remove existing cart items for this user
                await pool.query('DELETE FROM "Manzanitas Store".user_cart WHERE user_id = $1', [userId]);

                // Insert updated cart items
                    const insertQuery = `
                    INSERT INTO "Manzanitas Store".user_cart (user_id, candy_id, quantity) VALUES ($1, $2, $3)
                `;
                // insert each item in the cart
                for (const item of cartItems) {
                    await pool.query(insertQuery, [userId, item.candy_id, item.quantity]);
                }
            }
            // Commit the transaction
            await pool.query('COMMIT');
            res.status(200).json({message: 'Cart saved successfully'});
        // If we have errors, rollback the transaction
        } catch (error) {
            await pool.query('ROLLBACK');
            console.error('Error saving cart: ', error.message);
            res.status(500).json({error: 'Error saving cart'});
        }
        
    } catch (error) {
        console.error('Error saving cart: ', error.message);
        res.status(500).json({error: 'Error saving cart'});
    }
   
});

// Get the cart from the database
router.get('/get-cart/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {
        // Query the items in the users cart by joining products and user_cart tables
        const result = await pool.query(
            `SELECT p.candy_id, p.name, p.price, p.image, c.quantity
            FROM "Manzanitas Store".user_cart AS c
            JOIN "Manzanitas Store".products AS p
            ON c.candy_id = p.candy_id
            WHERE c.user_id = $1`, [userId]);
            // If no cart items are found, return an empty array
            if (result.rows.length === 0) {
                // No cart items found for this user
                console.log(`No cart items found for user ${userId}, keeping local cart`);
                return res.json([]);
            }   
            res.json(result.rows);
    } catch (error) {
        console.error('Error getting cart: ', error.message);
        res.status(500).json({error: 'Error getting cart'});
    }
});

// When user clears their cart
router.post('/clear-cart', async (req, res) => {
    const userId = req.body.userId;
    console.log(`user ID in clear cart: ${userId}`);
    try {
        await pool.query('DELETE FROM "Manzanitas Store".user_cart WHERE user_id = $1', [userId]);
        res.status(200).json({message: 'Cart cleared successfully'});
    } catch (error) {
        console.error('Error clearing cart: ', error.message);
        res.status(500).json({error: 'Error clearing cart'});
    }
});

module.exports = router;