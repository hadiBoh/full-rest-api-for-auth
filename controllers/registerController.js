const  User = require('../data/Users')
const bcrypt = require('bcrypt')


const register = async (req , res)=>{
    const {username , password} = req.body
    if(!username || !password) return res.status(403).json("incorrect user or pass")
    const duplicate = await User.findOne({username}).exec()
    if(duplicate) return res.status(403).json("username is already taken!")
    const hashedPassword = await bcrypt.hash(password ,10)

    const result = await User.create({ 
        "username":username,
        "password":hashedPassword
    })

    res.json(result)
} 

module.exports = register







/* const usersDB = {
    users: require("../data/users.json"),
    setUsers: function(payload){this.users = payload}
} 

const bcrypt = require('bcrypt')
const fsPromises = require('fs').promises
const path = require('path')

const register = async (req , res)=>{
    const {username , password} = req.body
    if(!username || !password) return res.status(403).json("incorrect user or pass")

    const duplicate = usersDB.users.some(user=> user.username === username)
    if(duplicate) return res.status(403).json("username is already taken!")
    const hashedPassword = await bcrypt.hash(password ,10)
    const newUser = {
        username,
        password:hashedPassword
    }

    const payload = [...usersDB.users , newUser]
    usersDB.setUsers(payload)

    await fsPromises.writeFile(path.join(__dirname , ".." , "data" , "users.json") , JSON.stringify(usersDB.users))
    res.json(usersDB.users)
}

module.exports = register */