import express from 'express';
import {db} from '../../db/connector.js';
import verifyToken from '../../middleware/auth.js';
const router = express.Router();

//get list of species sorted by common name
router.get('/', verifyToken, async (req, res) => {
    const {limit, offset} = req.body;
    if(limit == null){
        limit = 10;
    } 
    if(offset == null){
        offset = 0;
    }
    if(limit > 100){
        return res.send({error: "Max limit of 100"}).status(400);
    }
    const searchQuery = `
                        SELECT s.species_id, s.common_name, s.scientific_name, s.info, b.name
                        FROM public.species s JOIN public.biome b
                            ON s.biome = b.biome_id
                        ORDER BY common_name ASC
                        LIMIT $1 OFFSET $2
                        `;
    try{
        const search = await db.query(searchQuery, [limit, offset]);
        let data = [];
        for(var i = 0; i < search.rowCount; i++){
            data.push({
                "species_id": search.rows[i].species_id,
                "common_name": search.rows[i].common_name,
                "scientific_name": search.rows[i].scientific_name,
                "info": search.rows[i].info,
                "biome": search.rows[i].name
            });
        }
        res.json(data).status(200);
    }catch(error){
        console.error(error);
        res.status(500).send({error: "Server error"});
    }
});

export default router;