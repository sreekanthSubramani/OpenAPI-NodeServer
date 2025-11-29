import { Usermodel } from '../Models/Usermodel.js'
import express from 'express'
import bcrypt from 'bcrypt'

const createUserRoute = express.Router()



createUserRoute.post('/createUser', async (req, res)=>{
    const {name, dob, username, password} = req.body

    const hashedPassword = await bcrypt.hash(password, 10)

    try{
        const [user, created] = await Usermodel.findOrCreate({where : {username},
        defaults : {
                name : name,
                dob : dob,
                password : hashedPassword,
                username : username
        }})
        if(created){
            console.log(created)
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