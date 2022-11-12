const  User = require('../../data/Users')
const router = require("express").Router()
const verify = require('../../middleware/verifyJWT')


router.get("/", verify, async (req , res)=>{
    const users = await User.find().exec()
    console.log(users);
    res.json(users)
})


module.exports = router