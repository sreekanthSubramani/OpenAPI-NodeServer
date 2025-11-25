import "./env.js";   
import http from 'http'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { db } from './Database/db.js'
import { Usermodel } from "./Models/Usermodel.js";
import createUserRoute from "./UserDBApi/CreateUserRoute.js";
import userCheck from './JWT/logincheck.js'



const app = express()
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended : false}))
app.use(createUserRoute)
app.use(userCheck)

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





