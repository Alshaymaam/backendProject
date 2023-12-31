require('dotenv').config()
const express =require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions=require("./config/corsOptions")
const dbConn= require('./config/dbConn')
const mongoose = require('mongoose')
const {logger} = require('./middleware/logger')
const errorHandler = require("./middleware/errorHandler")
const app = express()
dbConn()
app.use(express.json)
const PORT = process.env.PORT||5000
app.use('/',express.static(path.join(__dirname,'public')))
app.use('/', require('./routes/root'))
app.use(cookieParser())
app.use(cors(corsOptions))
app.use(logger)
app.use('/notes',require('./routes/noteRoutes'))
app.use('/users',require('./routes/userRoutes'))
app.use('/auth',require('./routes/authRoutes'))


app.all('*',(req,res)=>{
    res.status(404)
    if (req.accepts('html')){
        res.sendFile(path.join(__dirname,'views','404.html'))
    }
    else if(req.accepts('json')){
        res.send({message:'404 page not found'})
    }
    else{
        res.type('text').send('404 page not found')
    }
})
app.use(errorHandler)
mongoose.connection.once('open',()=>{
    console.log('connected to DB')
})
app.listen(PORT,()=>console.log(`Running on port http://localhost:${PORT}`))