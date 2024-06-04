import { Router } from "express";
import userAuthenticationController from "../../controller/UserAuth/index.js";

const userAuthenticationRouter = Router();

userAuthenticationRouter.post("/auth/signUp",userAuthenticationController.SignUp);
userAuthenticationRouter.post("/auth/LogIn",userAuthenticationController.LogIn);
export default userAuthenticationRouter;