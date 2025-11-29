import jwt from 'jsonwebtoken'
import { Usermodel } from '../Models/Usermodel.js'
import express from 'express'
import bcrypt from 'bcrypt'
import { where } from 'sequelize'


const userCheck = express.Router()


    userCheck.post('/uservalidate', async (req, res)=>{
        const {username, password} = req.body

        try{
            const verifyValidUser = await Usermodel.findOne({where : {username}})
            if(verifyValidUser){
                const comparor = bcrypt.compare(verifyValidUser.dataValues.password, password)
                if(comparor){
                    const accessToken = jwt.sign({username : username}, process.env.JWT_Token, {
                        expiresIn : '1m'
                    })

                    const refreshToken = jwt.sign({username : username}, process.env.JWT_Token,{
                        expiresIn : '60d'
                    })

                    
                    await Usermodel.update(
                        {refreshKey : refreshToken},
                        {where : {username}}
                    )


                    res.json({access : accessToken, refresh : refreshToken})
                    

                }else{
                    console.log('Nope not true !!')
                }
            }
            else{
                console.log("Nope ! no user found !!")
            }

        }catch(e){
            console.log(e)
        }

    })






export default userCheck