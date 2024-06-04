 let Key = process.env.secret_key
 import jwt from 'jsonwebtoken'
import TokenModel from '../models/Token/index.js';
 const AuthenticationMiddleWare = async(req,res,next) =>{

   try {
    let token = req.headers.Authorization; 
    if(!token){
      return res.status(401).json({Warning: "Unauthorized Access"})
    }
    console.log(token,'token');
    //replace token initials
     token = token.replace("Bearer", "");

     //find token 
     const findToken = await TokenModel.findOne({
        where : {
            token:token
        }
     })
     if(!findToken){
        return res.status(400).json({Warning: "Unauthorized access"})
     }

     //intergrity of the server 

    try {
        let decoded = jwt.verify(token,Key);
        console.log(decoded);
        req.user = decoded;
        res.status(200).json({message: "Authorized", Required_Information: decoded})
    } catch (error) {
        res.status(500).json({Warning: "Unauthorized Access"})
    }
   } catch (error) {
    res.status(500).json({Error : "Internal server Error"})
   }


    next()
 }


 export default AuthenticationMiddleWare;