const express = require('express')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended : true}))

//TODO: deciding on list of routes and defining the endpoints

const ADDR = process.env.ADDR || '127.0.0.1'
const PORT = process.env.PORT || 5000

app.listen(PORT, ADDR, ()=>{
    console.log(`Server started ${ADDR}:${PORT}`)
})