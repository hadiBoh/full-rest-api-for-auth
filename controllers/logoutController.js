const  User = require('../data/Users')

const logout = async (req , res)=>{
    
    const cookie = req.cookies 
    const user = await User.findOne({refreshToken:cookie.jwt})
    if(!user){
        res.clearCookie('jwt' , {httpOnly:true , sameSite:"None" , secure:true})
        return res.sendStatus(204)
    } 
    user.refreshToken = ''
    const result = await user.save()
    console.log(result);
    res.clearCookie('jwt' , {httpOnly:true , sameSite:"None" , secure:true})
    res.sendStatus(204)
}

module.exports = logout