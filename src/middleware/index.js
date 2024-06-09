

import jwt from "jsonwebtoken"
import TokenModel from "../models/Token/index.js";
let key = process.env.secret_key;
const userAuthMiddleWare = async(req,res,next) =>{
   
    try {
        let token = req.headers.authorization;
        if(!token){
            return res.status(400).json({Warning: "UnAuthorized Access"})
        }
        console.log(token,'token');
          //trim token initials 
    
      token = token.replace("Bearer ", "");
      //   await TokenModel.create({
      //     token,
      //  })
      const findToken=await TokenModel.findOne({
        where:{
          //jwt token : header/body
          token:token,
        }
       })
       if(!findToken){
        return res.status(401).json({Warning: "Unauthorized Access"})
    }
       console.log(token,'token')
       //integrity of server
       try {
        const decoded = jwt.verify(token,key);
        req.user=decoded
  
        return res.status(200).json({
          Success:"User Authorized.",
          decoded
        })
    }
        catch(error){
            console.log(error)
            return res.status(401).json({Warning: "Unauthorized"})
        }
       
    } catch (error) {
        res.status(500).json({message: "Internal server error"})
    }

    next();
}

export default userAuthMiddleWare;