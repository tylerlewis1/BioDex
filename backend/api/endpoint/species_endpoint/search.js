import express from 'express';
import {db} from '../../db/connector.js';
import verifyToken from '../../middleware/auth.js';
const router = express.Router();

//get req
router.get('/', verifyToken, async (req, res) => {
    const {search_value} = req.body;
    const searchQuery = `
                        SELECT s.common_name, s.scientific_name, s.info, b.name
                        FROM public.species s JOIN public.biome b
                            ON s.biome = b.biome_id
                        WHERE UPPER(s.common_name) LIKE UPPER($1) OR UPPER(s.scientific_name) LIKE UPPER($1)
                        ORDER BY common_name ASC
                        LIMIT 100
                        `;
    try{
        const search = await db.query(searchQuery, [`%${search_value}%`]);
        let data = [];
        for(var i = 0; i < search.rowCount; i++){
            data.push({
                "common_name": search.rows[i].common_name,
                "scientific_name": search.rows[i].scientific_name,
                "info": search.rows[i].info,
                "biome": search.rows[i].name
            });
        }
        res.json(data).status(200);
    }catch(error){
        console.error(error);
        res.status(500).send({error: "Server error while searching for species"});
    }
});

export default router;