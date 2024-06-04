import { compare, hash } from "bcrypt";

import jwt from "jsonwebtoken";
//import TokenModel from "../model/token/index.js";
import UserAuthenticationModel from "../../models/userAdmin/index.js";
let key = process.env.secret_key;
const userAuthenticationController = {

    SignUp : async(req,res)=> {
        try {
            const payload = req.body;
            const userCheck = await UserAuthenticationModel.findOne({
                where : {
                     email : payload.email,
                }
            })
            if(userCheck){
                return res.status(400).json({message: "Already exist"})
            }
          //hashing ... SHA 256
            const hPassword = await hash(payload.password, 10);

            const data = await UserModel.create ({
                ...payload,
                password : hPassword
            })
            return res.status(201).json({message:"Registered successfully", data: data})
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Internal server error"})
        }
    },
    
    LogIn : async (req,res)=>{
        try {
            const payload = req.body;
            const userCheck = await UserAuthenticationModel.findOne({
                where : {
                     email : payload.email,
                }
            })
            if(!userCheck){
                return res.status(400).json({message: "Invalid Confirmations"})
            }
            //checkPassword 
            const isValid = await compare(payload.password, userCheck.password)
            if(!isValid){
                return res.status(400).json({message: "Invalid Confirmations"})
            }
            //token Data
            const tokenData = {
                id : userCheck.id,
                email : userCheck.email,
                //password : checkPost.password
            }

            //secure Token 
            
            // console.log(token);

            //jwt 
            const token = jwt.sign(tokenData,key,{
                expiresIn : "2hr"
            });
          //  await TokenModel.create({
          //       token,
          //   })
            console.log(token);
            res.status(200).json({Information: tokenData,token});
        } catch (error) {
            console.log(error)
            res.status(500).json({message: "Internal server error"})  
        }
    }
}

export default userAuthenticationController;