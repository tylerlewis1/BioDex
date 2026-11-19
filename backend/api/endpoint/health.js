import express from 'express';
import {db} from '../db/connector.js';
const router = express.Router();

//get req
router.get('/', async (req, res) => {
    const isDBRunning = await db.checkStatus;
    res.status(200).send(`Server up\n DB running: ${isDBRunning}`);
});

export default router;