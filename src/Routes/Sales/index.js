import { Router } from "express";
import salesController from "../../controller/Sales/index.js";
import validation from "../../validation/index.js";


const salesRouter = Router();

salesRouter.get("/AllSales",validation.Sales,salesController.getAll);
salesRouter.get("/Sales/:id",validation.Sales, salesController.getSingle);
salesRouter.post("/CreateSales",validation.Sales, salesController.Create);
salesRouter.put("/UpdateSales/:id",validation.Sales,salesController.Update);
salesRouter.delete("/DropSales/:id",validation.Sales, salesController.Delete);

export default salesRouter;