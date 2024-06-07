import { Router } from "express";
import productSalesController from "../../controller/productSales/index.js";
import productRouter from "../products/index.js";

import userAuthMiddleWare from "../../middleware/index.js";
import validation from "../../validation/index.js";
const productSalesRouter = Router();

productSalesRouter.get("/ProductSales",validation.productSales,userAuthMiddleWare,productSalesController.getAll)
productRouter.get("/productSales/:id",validation.productSales, productSalesController.getSingle);

productRouter.post("/CreateProductSales",productSalesController.Create);

productRouter.put("/UpdateProductSales/:id",validation.productSales,productSalesController.Update);

productRouter.delete("/DropProductSales/:id",validation.productSales, productSalesController.Delete)
export default productSalesRouter;