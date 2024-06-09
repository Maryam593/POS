import { Router } from "express";
import userAuthenticationController from "../../controller/UserAuth/index.js";
import userAuthMiddleWare from "../../middleware/index.js";
import validation from "../../validation/index.js";

const userAuthenticationRouter = Router();

userAuthenticationRouter.post("/auth/signUp",validation.SignUp,userAuthenticationController.SignUp);
userAuthenticationRouter.post("/auth/LogIn",validation.LogIn,userAuthMiddleWare,userAuthenticationController.LogIn);
export default userAuthenticationRouter;