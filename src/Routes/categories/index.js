
import { Router } from "express";
import categroyController from "../../controller/categories/index.js";
const categoryRouter = Router();

categoryRouter.get("/categories", categroyController.getAll);
categoryRouter.get("/category/:id", categroyController.getSingle);
categoryRouter.post("/createCategory", categroyController.Create);
categoryRouter.delete("/DropCategory/:id",categroyController.Delete);

export default categoryRouter;

