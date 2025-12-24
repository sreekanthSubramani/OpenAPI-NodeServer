import express from 'express'
import { Usermodel } from '../Models/Usermodel.js'
import jwtmiddleware from '../JWT/defaultmiddleware.js'
import { redisClient } from '../src/redis/redis.js'


const userProfile = express.Router()


userProfile.get('/user/profile', jwtmiddleware,  async (req, res)=>{
    
    const userid = req.user.userid
    const cacheKey = `user:${userid}`

    
    try{

        const getRedisResp = await redisClient.get(cacheKey)
        if(getRedisResp){
            res.json({msg : JSON.parse(getRedisResp)})
        }

        
        const userData = await Usermodel.findByPk(userid)
        const userMetaData = {
            name : userData?.name,
            profileLink : userData?.profileLink
        }


          await redisClient.set(
            cacheKey,
            JSON.stringify(userMetaData)
        )


      
        res.status(200).json({msg : userMetaData})

    }catch(e){
        console.log(e)
    }
})







export default userProfile