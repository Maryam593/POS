import { hash } from "bcrypt";
import UserAuthenticationModel from "../../models/userAdmin/index.js";

const userAuthenticationController = {
  //authentication
  signUp: async (req, res) => {
    try {
      const payload = req.body;

      const checkUser = await UserAuthenticationModel.findOne({
        where: {
          email: payload.email,
        },
      });

      if (checkUser) {
        return res.status(400).json({
          message: "User Already exist ",
        });
      }

      //hashing
      const hPassword = await hash(payload.password, 10);

      const data = await UserAuthenticationModel.create({
        userName : payload.userName, 
        email : payload.email,
        password: hPassword,
      });

      res.status(200).json({ message: "Registered Successfully" , Registration : data });
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: "Internal server error" });
    }
  },

  // LogIn: (req, res) => {
  //   try {
        
  //   } catch (error) {
  //       res.status(500).json({ message: "Internal server error" });
  //   }
  // },
};

export default userAuthenticationController;