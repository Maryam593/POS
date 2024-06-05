
import { Router } from "express";
import categroyController from "../../controller/categories/index.js";
import validation from "../../validation/index.js";
const categoryRouter = Router();

categoryRouter.get("/categories",validation.category, categroyController.getAll);
categoryRouter.get("/category/:id",validation.category, categroyController.getSingle);
categoryRouter.post("/createCategory",validation.category, categroyController.Create);
categoryRouter.delete("/DropCategory/:id",validation.category,categroyController.Delete);

export default categoryRouter;

