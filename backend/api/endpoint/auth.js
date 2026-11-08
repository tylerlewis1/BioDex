import express from 'express';
import env from "dotenv";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../db/connector.js';
//get env variables
env.config({ path: '../../.env' });

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key';

router.post('/signup', async (req, res) => {
    const {username, password, email} = req.body;
    //edge case
    if(!username || !password || !email){
        return res.status(400).json({error: 'Username, password, and email are required'});
    }
    //password security
    if(password.length < 8){
        return res.status("400").json({error: "Password must be at least 8 characters long"});
    }
    try {
        //check to see if user already exists
        const checkUserQuery = 'SELECT username, email FROM public.users WHERE username = $1 OR email = $2';
        const existingCheck = await db.query(checkUserQuery, [username, email]);
        if(existingCheck.rows.length != 0){
            return res.status(400).json({error: "Username or email already exists"});
        }
        //hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        //add user to db
        const insertQuery = `INSERT INTO public.users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username, email, created_at`;
        const result = await db.query(insertQuery, [username, email, hashedPassword]);
        if(result.rows.length != 0){
            //successful signup
            return res.status(200).json({success: true, user: result.rows[0]});
        } else {
            //error
            throw new Error("User creation failed");
        }
    }catch (error) {
        console.error(error);
        return res.status(500).json({error:  "There was a server side error."});
    }
})


//login endpoint
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    //edge case
    if(!username || !password){
        return res.status(400).json({error: 'Username and password are required'});
    }
    //check for user in DB
    try {
        const queryText = 'SELECT * FROM users WHERE username = $1';
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