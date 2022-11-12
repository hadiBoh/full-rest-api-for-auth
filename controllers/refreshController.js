const  User = require('../data/Users')
const jwt = require('jsonwebtoken')

const refresh = async (req , res)=>{
    const cookie = req.cookies

    if(!cookie?.jwt) return res.sendStatus(401)

    const refreshToken = cookie.jwt
    const user = await User.findOne({refreshToken}).exec()


    if(!user) return res.sendStatus(403)

    jwt.verify(
        refreshToken,
        process.env.RT,
        (err , decoded)=>{
            if(err || decoded.username !== user.username) res.sendStatus(403)
            const accessToken = jwt.sign(
                {username:decoded.username},
                process.env.AT,
                {expiresIn:"30s"}
            )
            res.json({username:decoded.username ,accessToken})
        }
    )


}

module.exports = refresh