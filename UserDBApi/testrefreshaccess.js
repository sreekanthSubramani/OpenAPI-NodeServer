import express from 'express'
import { Usermodel } from '../Models/Usermodel'
import jwt from 'jsonwebtoken'

const refreshKeyRoute = express.Router()



function signForAccessKey(user){
    return jwt.sign({username : user.username}, process.env.JWT_Token,{
        expiresIn : '15m'
    })
}

function signForRefreshKey(user){
    return jwt.sign({username : user.username}, process.env.JWT_Token,{
        expiresIn : "60d"
    })
}


refreshKeyRoute.post('/user/refreskey', async (req, res)=>{

    const {refresh} = req.body

    if(!refresh){
        return res.status(400).json({msg : "Refresh key not found"})
    }

    let decode;
    
    try{
        decode =  jwt.verify(refresh, process.env.JWT_Token)
    }catch(e){
        console.log(e, 'Error while verifying the jwt')
    }
    


        const user = await Usermodel.findOne({
            where : {
                refreshKey : refresh,
                id : decode.id
            }
        })
        

        if(!user){
            return res.status(400).json({msg : "no refresh key found !!"})
        }


        const newAccessKey = signForAccessKey(user)
        const newRefreshKey = signForRefreshKey(user)

        res.json({
            access : newAccessKey,
            refresh : newRefreshKey
        })




})





export default refreshKeyRoute