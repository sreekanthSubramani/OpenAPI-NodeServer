import { Usermodel } from '../Models/Usermodel.js'
import express from 'express'
import bcrypt from 'bcrypt'

const createUserRoute = express.Router()



createUserRoute.post('/createUser', async (req, res)=>{
    const {name, dob, username, password, userid} = req.body

    try{
        const findUserID = await Usermodel.findByPk(userid)
        if(findUserID){
            return res.status(409).json({msg : "User already exists"})
        }else{
            const hashedPassword = bcrypt.hash(password, 10)

            const createUser = await Usermodel.create({
                name : name,
                dob : dob,
                username : username,
                password : hashedPassword
            })
            if(createUser){
                return res.status(201).json({msg : "User created"})
            }

            return res.status(500).json({msg : "Something went wrong !!"})
        }
    }catch(e){
        return res.status(404).json({msg : 'Something wrong with the server !!'})
    }
    
})




export default createUserRoute