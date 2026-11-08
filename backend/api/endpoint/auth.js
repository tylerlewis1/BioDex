import express from 'express';
import env from "dotenv";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../db/connector.js';
//get env variables
env.config({ path: '../../.env' });

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key';


router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    //edge case
    if(!username || !password){
        return res.status(400).json({error: 'Username and password are required'});
    }
    //check for user in DB
    try {
        let queryText = 'SELECT * FROM users WHERE username = $1';
        const result = await db.query(queryText, [username]);
        //no username in db
        if(!result || result.rows.length == 0){
            return res.status(401).json({error: 'Invalid username or password'});
        }
        const userData = result.rows[0];
        const isPasswordMatch = await bcrypt.compare(password, userData.password_hash);
        if(isPasswordMatch == false){
            return res.status(401).json({error: "Invalid username or password"});
        }
        //create JWT
        const token = jwt.sign({ userId: userData.id, username: userData.username }, JWT_SECRET, { expiresIn: '24h' });
        return res.status(200).json({succsess: true, JWT: token,
            user: {
                id: userData.id,
                username: userData.username,
                email: userData.email
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({error:  "There was a server side error."});
    }

});

export default router;