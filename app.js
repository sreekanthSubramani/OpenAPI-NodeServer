import "./env.js";   
import './src/redis/redis.js'
import http from 'http'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { db } from './Database/db.js'
import { Usermodel } from "./Models/Usermodel.js";
import createUserRoute from "./UserDBApi/CreateUserRoute.js";
import userCheck from './JWT/signincheck.js'
import locationSetters from "./UserDBApi/Locations.js";
import userProfile from "./Userprofile/Userprof.js";
import refreshKeyRoute from './UserDBApi/refreshtokenaccess.js'
import locationInserter from './LocationInserter/LocationHandler.js'
import paramsQuery from './LocationInserter/ParamsQuery.js'
import { Locationmodel } from "./Models/Locationmodel.js";


const app = express()
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended : false}))
app.use(createUserRoute)
app.use(userCheck)
app.use(userProfile)
app.use(refreshKeyRoute)
app.use(locationInserter)
app.use(paramsQuery)


const PORT = 1999

const server = http.createServer(app)

Usermodel.hasMany(Locationmodel, {foreignKey : "userid"})
Locationmodel.belongsTo(Usermodel, {foreignKey : 'userid'})

db.authenticate()
.then(()=>{
    Usermodel.sync()
    Locationmodel.sync()
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







