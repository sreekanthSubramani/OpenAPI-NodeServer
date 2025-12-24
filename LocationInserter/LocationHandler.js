
import jwtmiddleware from "../JWT/defaultmiddleware.js";
import { Usermodel } from "../Models/Usermodel.js";
import { Locationmodel } from "../Models/Locationmodel.js";
import express from 'express'

const locationInserter = express.Router()



locationInserter.post('/location/arr/places', jwtmiddleware, async (req, res)=>{
    const userid = req.user.userid
    const {lat, long, name, state, country} = req.body

    try{
    const findAndCreateUser = await Locationmodel.create({
        userid : userid,
        name : name,
        latitude : lat,
        longitude : long,
        state : state,
    })

    return res.status(201).json({msg : "Location updated !!"})

    }catch(e){

        return res.status(404).json({msg : e, trueMsg : 'Unable to update the location'})

    }

} )



export default locationInserter


///to update places in DB
///AllAsyncFetchServices.tsx