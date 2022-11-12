const refresh = require("../../controllers/refreshController")
const router = require("express").Router()


router.get("/",refresh) 


module.exports = router