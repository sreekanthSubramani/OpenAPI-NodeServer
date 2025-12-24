import express from 'express'
import jwtmiddleware from "../JWT/defaultmiddleware.js";
import { Usermodel } from '../Models/Usermodel.js'
import { Locationmodel } from '../Models/Locationmodel.js';
import { Op } from 'sequelize';

const paramsQuery = express.Router()

const dateToday = new Date().toISOString()
const queryMade = new Date(dateToday).toLocaleString(undefined, {timezone : "Asia/Kolkatta"})

let onlyDate = queryMade.toString().split(',')[0]

//today query

paramsQuery.get('/location/arr', jwtmiddleware, async( req, res)=>{

    const userid = req.user.userid

        const startOfDay = `${onlyDate} 00:00:00`
        const endOfDay   = `${onlyDate} 23:59:59`

    try{    

        const getLocationsAsPerDate = await Locationmodel.findAll({
            where :{
                userid : userid,
                createdAt : {
                    [Op.between] : [startOfDay, endOfDay]
                }
            },
        })
        

        return res.status(200).json({msg : getLocationsAsPerDate})

    }catch(e){
        res.json({msg : e})
    }

})


//user selected data

paramsQuery.get('/user/data', jwtmiddleware, async( req, res)=>{
    const date = req.query.date
    const userid = req.user.userid


            const startOfDay = `${date} 00:00:00`
            const endOfDay   = `${date} 23:59:59`


    try{    

        const getLocationsAsPerDate = await Locationmodel.findAll({
            where :{
                userid : userid,
                createdAt : {
                    [Op.between] : [startOfDay, endOfDay]
                }
            },
        })
        

        return res.status(200).json({msg : getLocationsAsPerDate})

        console.log(date, 'date from front end')

    }catch(e){
        res.json({msg : e})
    }

})


export default paramsQuery


//LocationScreen.tsx - endpoints for this front end files 