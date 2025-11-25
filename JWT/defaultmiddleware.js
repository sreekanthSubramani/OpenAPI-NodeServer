import jwt from 'jsonwebtoken'

export const jwtmiddleware = (req, res, next)=>{
    
    const headers = req.headers.authorization

    if(!headers){
        return res.status(400).json({msg : "Auth Header Missing"})
    }

    const token = headers.split(" ")[1]

    try{
        const userToken = jwt.verify(token, process.env.JWT_Token)
        req.user = userToken 
        next()
    }catch(e){
        console.log(e)
    }
    
}