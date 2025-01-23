const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../db');

const router = express.Router();

router.post('/signup', async(req, res) => {
    const {firstName, lastName, username, email, password} = req.body;

    try {
        const userExists = await pool.query(
            `SELECT * FROM "Manzanitas Store".users WHERE username = $1 OR email = $2`, [username, email]
        );

        if (userExists.rows.length > 0) {
            return res.status(400).json({error: 'Username or email already exists'});
        }


        // Salt and hash the passwords
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Insert new user into the database
        const newUser = await pool.query(
            `INSERT INTO "Manzanitas Store".users (first_name, last_name, username, email, password)
             VALUES ($1, $2, $3, $4, $5) RETURNING id, username, email
            `, [firstName, lastName, username, email, hashedPassword]
        );

        res.status(201).json({
            message: 'User registered successfully',
            user: newUser.rows[0],
        });

    } catch (err) {
        console.log('Error registering user: ', err);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

module.exports = router;