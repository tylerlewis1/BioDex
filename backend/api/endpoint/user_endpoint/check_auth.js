import express from 'express';
import verifyToken from '../../middleware/auth.js';
const router = express.Router();

//Checks if the user is authenticated and returns the user object if they are
router.get('/', verifyToken, async (req, res) => {
   if(!req.user) {
        return res.status(401).json({ auth: false });
   }
   return res.status(200).json({ auth: true, user: req.user });
});


export default router;