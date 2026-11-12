import express from 'express';
import {db} from '../../db/connector.js';
import verifyToken from '../../middleware/auth.js';
const router = express.Router();

//get list of species sorted by common name
router.post('/', verifyToken, async (req, res) => {
    const {limit, offset} = req.body;
    if(limit > 100){
        return res.send({error: "Max limit of 100"}).status(400);
    }
    if(limit == null){
        limit = 10;
    } 
    if(offset == null){
        offset = 0;
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

//get list of species by biome sorted by common name
router.post('/biome', verifyToken, async (req, res) => {
    const {limit, offset, biome_id} = req.body;
    if(biome_id == null){
        return res.send({error: "biome_id is required"}).status(400);
    }
    if(limit > 100){
        return res.send({error: "Max limit of 100"}).status(400);
    }
    if(limit == null){
        limit = 10;
    } 
    if(offset == null){
        offset = 0;
    }
    const searchQuery = `
                        SELECT s.species_id, s.common_name, s.scientific_name, s.info, b.name
                        FROM public.species s JOIN public.biome b
                            ON s.biome = b.biome_id
                        WHERE s.biome = $3
                        ORDER BY common_name ASC
                        LIMIT $1 OFFSET $2
                        `;
    try{
        const search = await db.query(searchQuery, [limit, offset, biome_id]);
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