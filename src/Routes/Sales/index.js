import { Router } from "express";
import salesController from "../../controller/Sales/index.js";
import validation from "../../validation/index.js";
import userAuthMiddleWare from "../../middleware/index.js";


const salesRouter = Router();

salesRouter.get("/AllSales",userAuthMiddleWare,validation.Sales,salesController.getAll);
salesRouter.get("/Sales/:id",validation.Sales, salesController.getSingle);
salesRouter.post("/CreateSales", salesController.Create);
salesRouter.put("/UpdateSales/:id",validation.Sales,salesController.Update);
salesRouter.delete("/DropSales/:id",validation.Sales, salesController.Delete);

export default salesRouter;