import express from 'express';
import {db} from '../db/connector.js';
const router = express.Router();

//get req
router.get('/', async (req, res) => {
    const isDBRunning = await db.checkStatus;
    res.send(`Server up\n DB running: ${isDBRunning}`).status(200);
});

export default router;