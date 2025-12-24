import express from 'express'
import { Usermodel } from '../Models/Usermodel.js'
import jwtmiddleware from '../JWT/defaultmiddleware.js'

const locationSetters = express.Router()



locationSetters.post('/user/locations', jwtmiddleware, async (req, res)=>{

    const {lats, longs, city, state} = req.body
    const userID = req.user.userid
    
    console.log(userID, 'user id')

    const addLocation = {
        city : city,
        lats : lats,
        longs : longs,
        state : state
    }

    try{
        const findUser = await Usermodel.findByPk(userID)
        if(!findUser){
            throw new Error('No not a valid user')
        }

        const theUserLocationList = findUser.locations
        theUserLocationList.push(addLocation)

        await findUser.save()

    }catch(e){  
        console.log(e, 'ran into catch block')
    }   
    

})




export default locationSetters