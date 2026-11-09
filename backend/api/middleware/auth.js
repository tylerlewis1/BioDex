import jwt from 'jsonwebtoken';
import env from 'dotenv';
env.config({ path: '../../.env' });
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    //if no token in request header
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({error: "Access denied. No token provided."});
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        next();
    } catch(error){ 
        //token expired
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Unauthorized: Token has expired.' });
        }
        console.error(error);
        return res.status(500).json({error: "Server side error."})
    }
};
export default verifyToken;