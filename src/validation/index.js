
import Joi from "joi";
const validation =  {

          LogIn : (req,res,next)=> {
            //scehma building
            const schema = Joi.object({
                email : Joi.string().email().required(),
                password : Joi.string().required()
            }); 
            
            //schema validation
            const {value, error} = schema.validate(req.body);
            if(error){
                return res.status(400).json({
                    message: "Invalid Data",
                    error,
                })
            }
           // next();
          },
        
          SignUp : (req,res,next) => {
           //schema building 
           const schema = Joi.object({
            userName : Joi.string()
            .alphanum()
            .min(0)
            .max(25)
            .required(),
    
            password : Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
            .min(4)
            .max(16)
            .required(),
    
            email :  Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        
           })
    
    
           const {value, error} = schema.validate(req.body,{
            email: 'user@example.com',
           });
           if(error)
            return res.status(400).json({
                message: "Invalid Data",
                error,
            })
          } ,

          category : (req,res,next) => {
            //schema building 
            const schema = Joi.object({
            // for color 
            color : Joi.string(),
            //for brand name 
            Brand : Joi.string()
            .min(3)
            .max(15),
            //shoe size number 
            size: Joi. number()
            .min(5)
            .max(40)
            })

            //validating a schema 
            const {value,error} = schema.validate(req.body, {

            })
            if(error) {
                return res.status(400).json({
                    message: "Invalid Data", error
                })
            }
            next()
          },
          product : (req,res,next) => {
            //schema building 
            const schema = Joi.object({
              
                //for name 
                name : Joi.string()
                .min(5)
                .max(25),
                //shoe size number 
                stock: Joi. number(),
                // .min(5)
                // .max(14)
                rate : Joi.number(),
                
                })
    
                //validating a schema 
                const {value,error} = schema.validate(req.body, {
    
                })
                if(error) {
                    return res.status(400).json({
                        message: "Invalid Data", error
                    })
                }
                next();
          },
          productSales : (req,res,next) => {
            const scehma = Joi.object({
                quantity : Joi.string(),
                price : Joi.number(),

            })
            //validating a schema 
            const {value,error} = scehma.validate(req.body,{

            })
            if(error){
                return res.status(404).json({
                    message:"Invalid Data",error
                })
            }
            next();
          }
    
}

export default validation