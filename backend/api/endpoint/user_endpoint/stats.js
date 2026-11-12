import express from 'express';
import {db} from '../../db/connector.js';
import verifyTokenWithID from '../../middleware/auth.js';
const router = express.Router();

//get list of species sorted by common name
router.get('/:id', verifyTokenWithID, async (req, res) => {
    const { id } = req.params;
    if(!id || !req.user){
        return res.status(400).json({error: "User ID and JWT are required"});
    }
    if(id != req.user.userId){
        return res.status(400).json({error: "You cannot get stats for an account that is not yours"});
    }
    
    const countSightingQuery = `
        SELECT COUNT(*), COUNT(DISTINCT s.species_id) as "unique"
        FROM public.sighting s
        WHERE s.created_by = $1
        `;
    try{
        const search = await db.query(countSightingQuery, [id]);
        
        res.json({
            total_sightings: search.rows[0].count,
            species_sighted: search.rows[0].unique,
            total_species: process.env.TOTAL_SPECIES
        }).status(200);
    }catch(error){
        console.error(error);
        res.status(500).send({error: "Server error"});
    }
});


export default router;