import { Router } from "express";
import productSalesController from "../../controller/productSales/index.js";
import productRouter from "../products/index.js";
const productSalesRouter = Router();

productSalesRouter.get("/ProductSales", productSalesController.getAll);

productRouter.get("/productSales/:id", productSalesController.getSingle);

productRouter.post("/CreateProductSales",productSalesController.Create);

productRouter.put("/UpdateProductSales/:id",productSalesController.Update);

productRouter.delete("/DropProductSales/:id", productSalesController.Delete)
export default productSalesRouter;