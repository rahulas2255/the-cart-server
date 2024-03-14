require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./Routes/router')
require('./Connection/db')



const DailyCartServer = express()
DailyCartServer.use(cors())
DailyCartServer.use(express.json())
DailyCartServer.use(router)

const PORT = 3000 || process.env.PORT
DailyCartServer.listen(PORT,()=>{
    console.log(`TheCart server started at port : ${PORT}`);
})

DailyCartServer.get('/',(req,res)=>{
    res.send(`<h1> TheCart server started.... Waiting for Client Request!!! </h1>`)
})