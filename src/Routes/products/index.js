import { Router } from "express";
import productController from "../../controller/products/index.js";
const productRouter = Router();

productRouter.get("/products",productController.getAll);
productRouter.get("/product/:id",productController.getSingle);
productRouter.post("/CreateProducts", productController.Create);
productRouter.put("/UpdateProduct/:id", productController.Update);
productRouter.delete("/DropProduct/:id", productController.Delete);

export default productRouter;