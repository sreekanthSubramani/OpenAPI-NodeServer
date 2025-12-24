import {createClient} from 'redis'


export const redisClient = createClient({
    url : "redis://localhost:6379"
})

redisClient.on('connect', ()=>{
    console.log('redis connected')
})

redisClient.on('error', ()=>{
    console.log('Redis Error')
})


await redisClient.connect()