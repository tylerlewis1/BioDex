import express from 'express';
import {db} from '../../db/connector.js';
import verifyToken from '../../middleware/auth.js';
const router = express.Router();
//get list bioems and cover images
router.get('/list', verifyToken, async (req, res) => {
    const biomeListQuery = `
        SELECT *
        FROM public.biome
        ORDER BY biome_id ASC
        `;
    try{
        const search = await db.query(biomeListQuery);
        const data = [];
        for(var i = 0; i < search.rowCount; i++){
            data.push({
                biome_id: search.rows[i].biome_id,
                name: search.rows[i].name,
                countries: search.rows[i].countries,
                image_url: search.rows[i].image_url
            })
        }
        res.json(data).status(200);
    }catch(error){
        console.error(error);
        res.status(500).send({error: "Server error"});
    }
});


export default router;