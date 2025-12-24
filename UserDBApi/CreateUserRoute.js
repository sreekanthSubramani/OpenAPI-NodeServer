import { Usermodel } from '../Models/Usermodel.js'
import express from 'express'
import bcrypt from 'bcrypt'

const createUserRoute = express.Router()



createUserRoute.post('/createUser', async (req, res)=>{
    const {name, dob, username, password, profileLink} = req.body


    console.log(req.body, 'req body')
    const hashedPassword = await bcrypt.hash(password, 10)

    try{
        const user = await Usermodel.create({
            name : name,
            dob : dob,
            username : username,
            password : hashedPassword,
            profileLink : profileLink
        })
        if(user){
            return res.status(201).json({msg : "User Created"})
        }else{
            console.log('already exists !!')
            return res.status(409).json({msg : " User already exists !!"})
        }
    }catch(e){
        return res.status(404).json({msg : 'Something wrong with the server !!'})
    }

})




export default createUserRoute