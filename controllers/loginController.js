const  User = require('../data/Users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



const login = async (req , res)=>{
    const {username , password} = req.body
    const user = await User.findOne({username}).exec()
    if(!user) return res.status(403).json("username is not correct!")
    const match = await bcrypt.compare(password , user.password)
    if(!match) return res.status(403).json("password is not correct!")

    const accessToken = jwt.sign(
        {username} ,
        process.env.AT,
        {expiresIn:"15s"}
    )
    const refreshToken = jwt.sign(
        {username} ,
        process.env.RT,
        {expiresIn:"1d"}
    )

        user.refreshToken = refreshToken
        await user.save()

    res.cookie("jwt" , refreshToken , {httpOnly:true , sameSite:'None' , secure:true , maxAge: 24 * 60 * 60 * 1000})
    res.json({username:user.username , accessToken})
}

module.exports = login