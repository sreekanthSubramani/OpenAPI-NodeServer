import jwt from "jsonwebtoken";

const jwtmiddleware = (req, res, next) => {
  const headers = req.headers.authorization;

  const token = headers.split(" ")[1];

  try{
      if (!token) {
         return res.status(401).json({ message: "Auth header missing" });
      }

   let decode = jwt.verify(token, process.env.JWT_Token)
    
   req.user = decode;
  next();

  }catch(e){
    if(e.name === "TokenExpiredError"){
        return res.status(401).json({ message: "Access token expired", err : e });
    }
  }
};

export default jwtmiddleware;
