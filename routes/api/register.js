const register = require("../../controllers/registerController")
const router = require("express").Router()


router.post("/",register)


module.exports = router