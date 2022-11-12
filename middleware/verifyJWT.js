
const jwt = require('jsonwebtoken')
require('dotenv').config()

const verify = (req , res , next)=>{

    const authHeader = req.headers.authorization || req.headers.Authorization;
    
    if(!authHeader?.startsWith('Bearer')) return res.sendStatus(401)

    const token = authHeader.split(" ")[1]

    jwt.verify(
        token ,
        process.env.AT,
        (err , decoded)=>{
            if (err) return res.status(403).json(err);
            req.user = decoded.username;
            next();
        }
    )
}

module.exports = verify