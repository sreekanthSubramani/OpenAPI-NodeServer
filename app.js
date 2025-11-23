import "./env.js";   
import http from 'http'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { db } from './Database/db.js'
import { Usermodel } from "./Models/Usermodel.js";

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({extended : false}))


const PORT = 1999

const server = http.createServer(app)

db.authenticate()
.then(()=>{
    Usermodel.sync({alter : true})
    .then(()=>{
            server.listen(PORT, (e)=>{
    if(!e){
        console.log('Server Up')
    }else{
        console.log('Not connected')
    }
    })
})
})
.catch((e)=>{
    console.log(e)
})





