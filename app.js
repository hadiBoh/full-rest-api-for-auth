require('dotenv').config()
const express = require('express')
const app = express()
const PORT = 3500
const corsOptions = require('./config/coresOptions')
const credentials = require('./middleware/credentials')
const cors = require('cors')
const cookiePrser = require("cookie-parser")
const mongoose = require('mongoose')


async function dbC(){ 
    try {
        await mongoose.connect(`mongodb+srv://hadiboh:${process.env.DB_PASS}@cluster0.8iruxgm.mongodb.net/?retryWrites=true&w=majority` ,
        {useUnifiedTopology:true , useNewUrlParser:true}) 
    } catch (error) {
        console.log("oh");  
        console.log(error);
    }
}
dbC()

app.use(credentials)

app.use(cors(corsOptions))

app.use(express.urlencoded({ extended: false }))

app.use(express.json())

app.use(cookiePrser())


app.use("/register" , require('./routes/api/register'))

app.use("/login" , require('./routes/api/login'))

app.use("/refresh" , require('./routes/api/refresh'))

app.use("/users" , require('./routes/api/users'))

app.use("/logout" , require('./routes/api/logout'))


mongoose.connection.once('open' , ()=>{
    console.log("conected fuck islamic republic");
    app.listen(PORT , console.log(`server running on port ${PORT}`))
})

