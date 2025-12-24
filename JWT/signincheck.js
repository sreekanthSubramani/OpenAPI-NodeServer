import jwt from 'jsonwebtoken'
import { Usermodel } from '../Models/Usermodel.js'
import express from 'express'
import bcrypt from 'bcrypt'



const userCheck = express.Router()


    userCheck.post('/uservalidate',  async (req, res)=>{
        const {username, password} = req.body
        try{
            const verifyValidUser = await Usermodel.findOne({where : {username}})

            if(verifyValidUser){
                const comparor = await bcrypt.compare(password, verifyValidUser.dataValues.password)
                if(!comparor){
                    return res.status(401).json({msg : "Password not right"})
                }
                    const accessToken = jwt.sign({username : verifyValidUser.username, userid : verifyValidUser.userid}, process.env.JWT_Token, {
                        expiresIn : '60m'
                    })

                    const refreshToken = jwt.sign({username : verifyValidUser.username, userid : verifyValidUser.userid}, process.env.JWT_Refresh,{
                        expiresIn : '60d'
                    })

                    
                    res.status(200).json(
                        {access : accessToken,
                        refresh : refreshToken,
                        name : verifyValidUser.name,
                        photo : verifyValidUser.profileLink,
                        email : verifyValidUser.username
                        })

                    verifyValidUser.refreshKey = refreshToken;
                    await verifyValidUser.save()

                }else{
                    return res.status(404).json({msg : "user not found !!"})
                }

        }catch(e){
            return res.status(500).json({msg : 'did not validate user!!'})
        }

    })






export default userCheck