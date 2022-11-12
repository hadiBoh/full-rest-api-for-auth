const login = require("../../controllers/loginController")
const router = require("express").Router()


router.post("/",login)


module.exports = router