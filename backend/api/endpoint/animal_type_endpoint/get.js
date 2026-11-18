import express from 'express';
import {db} from '../../db/connector.js';
import verifyToken from '../../middleware/auth.js';
const router = express.Router();
//get list animal types and cover images
router.get('/list', verifyToken, async (req, res) => {
    const animalTypeListQuery = `
        SELECT *
        FROM public.animal_type
        ORDER BY animal_type_id ASC
        `;
    try{
        const search = await db.query(animalTypeListQuery);
        const data = [];
        for(var i = 0; i < search.rowCount; i++){
            data.push({
                animal_type_id: search.rows[i].animal_type_id,
                type_name: search.rows[i].type_name,
            })
        }
        res.json(data).status(200);
    }catch(error){
        console.error(error);
        res.status(500).send({error: "Server error"});
    }
});


export default router;