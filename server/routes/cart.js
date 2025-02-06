const express = require("express");
const pool = require('../db');
const router = express.Router();

// Save the cart to the database
router.post('/save-cart', async (req, res) => {

    const { userId, cartItems } = req.body;
    console.log("Received userId: ", userId);
    console.log("Received cartItems: ", cartItems);

    try {
        if (!Array.isArray(cartItems)) {

            console.error('Cart items is not an array: ', cartItems);
            return res.status(400).json({error: 'Cart items is not an array'});
        }

        
        // Remove existing cart items
        await pool.query('DELETE FROM "Manzanitas Store".user_cart WHERE user_id = $1', [userId]);


        // Insert new cart items
        const insertQuery = ` 
        INSERT INTO "Manzanitas Store".user_cart (user_id, candy_id, quantity) VALUES ($1, $2, $3)
        `;
    
        for (const item of cartItems ) {
            await pool.query(insertQuery, [userId, item.candy_id, item.quantity]);
        }
    
    
        res.status(200).json({message: 'Cart saved successfully'});
    } catch (error) {
        console.error('Error saving cart: ', error.message);
        res.status(500).json({error: 'Error saving cart'});
    }
   
});

// Get the cart from the database
router.get('/get-cart/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {
        const cartItems = await pool.query('SELECT * FROM "Manzanitas Store".user_cart WHERE user_id = $1', [userId]);
       
        res.status(200).json(cartItems.rows);
    } catch (error) {
        console.error('Error getting cart: ', error.message);
        res.status(500).json({error: 'Error getting cart'});
    }
});

module.exports = router;