import express from 'express'
import jwt from 'jsonwebtoken'
import { Usermodel } from '../Models/Usermodel.js'


const refreshTokenRoute = express.Router()



function generateAccessToken(user){
    return jwt.sign(
        {id : user.id, username : user.username}, process.env.JWT_Token,{
            expiresIn : "15m"
        }
    )
}

function generateRefreshToken(user){
    return jwt.sign({ id : user.id, username : user.username},
        process.env.JWT_Token,
        {expiresIn : "60d"}
    )
}



refreshTokenRoute.post('/user/refreshtoken', async (req, res)=>{
    try{

        const { refresh } = req.body

        if(!refresh){
            return res.status(400).json({msg : "Error on fetching the refresh code !!"})
        }

        let decode ;
        try{
            decode = jwt.verify(refresh, process.env.JWT_Token)
        }catch(e){
            console.log(e)
        }

        const user = await Usermodel.findOne({
            where : {
                id : decode.id,
                refreshToken : refresh
            }
        })

        if(!user){
            return res.status(400).json({msg : "Unable to find the User ID"})
        }

        const newAccessToken = generateAccessToken(user)
        const newRefreshToken = generateRefreshToken(user)


        await Usermodel.update(
            
                {refreshToken : newRefreshToken},
                {where : {id : user.id}}
            
        )

        res.json({
            access : newAccessToken,
            refresh : newRefreshToken
        })



    }catch(e){
        console.log(e)
    }
})





export default refreshTokenRoute