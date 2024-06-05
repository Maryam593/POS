import { Router } from "express";
import salesController from "../../controller/Sales/index.js";


const salesRouter = Router();

salesRouter.get("/AllSales",salesController.getAll);
salesRouter.get("/Sales/:id", salesController.getSingle);
salesRouter.post("/CreateSales", salesController.Create);
salesRouter.put("/UpdateSales/:id",salesController.Update);
salesRouter.delete("/DropSales/:id", salesController.Delete);

export default salesRouter;