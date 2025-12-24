import express from 'express'
import { Usermodel } from '../Models/Usermodel.js'
import jwt from 'jsonwebtoken'

const refreshKeyRoute = express.Router()



function signForAccessKey(user){
    return jwt.sign({username : user.username, userid : user.userid}, process.env.JWT_Token,{
        expiresIn : '60m'
    })
}

function signForRefreshKey(user){
    return jwt.sign({username : user.username, userid : user.userid}, process.env.JWT_Refresh,{
        expiresIn : "60d"
    })
}


refreshKeyRoute.post('/user/refreshtoken', async (req, res)=>{

    const {refresh} = req.body
    console.log(refresh, 'refresh token')

    if(!refresh){
        return res.status(400).json({msg : "Refresh key not found"})
    }

    let decode;
    try{
        decode =  jwt.verify(refresh, process.env.JWT_Refresh)
    }catch(e){
        return res.status(401).json({ msg: "Invalid refresh token" });

    }
    
 
        const user = await Usermodel.findByPk(decode.userid)
        const existingRefreshKey = user.refreshKey

        if(!existingRefreshKey){
            return res.status(402).json({msg : "no refresh key sent !!"})
        }

            if (existingRefreshKey !== refresh) {
                return res.status(403).json({ msg: "Refresh token mismatch" });
            }


        if(existingRefreshKey === refresh){
            const newAccessKey = signForAccessKey(user)
            const newRefreshKey = signForRefreshKey(user)

            user.refreshKey = newRefreshKey
            await user.save()

            return res.json({access : newAccessKey, refresh : newRefreshKey})
        }
        
        if(!user){
            return res.status(400).json({msg : "no user found !!"})
        }
        
        return res.status(404).json({msg : 'refresh endpoint not working !!'}) 

})





export default refreshKeyRoute