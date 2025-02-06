const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../db');

const router = express.Router();


router.post('/login', async(req, res) => {
    const {identifier, password} = req.body;
    
    try {
        // Check if the identifier (username or email) exists
        const userQuery = `
            SELECT * FROM "Manzanitas Store".users WHERE username = $1 or email = $1;
        `;

        const result = await pool.query(userQuery, [identifier]);
   

        if (result.rows.length === 0) {
            return res.status(400).json({error: 'Invalid username/email or password'});
        }

        // Save data fetched in user object
        const user = result.rows[0];

        // validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid) {
            return res.status(400).json({error: 'Invalid username/email or password'});
        }

        // Respond with user info (excluding the password)
        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                firstName: user.first_name,
                lastName: user.last_name,
            },
        });

    } catch (err) {
        console.error("Error logging in: ", err);
    }
});

module.exports = router;