const logout = require("../../controllers/logoutController")
const router = require("express").Router()


router.get("/",logout)


module.exports = router