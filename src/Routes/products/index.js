import { Router } from "express";
import productController from "../../controller/products/index.js";
import validation from "../../validation/index.js";
//import validation from "../../validation/index.js";
const productRouter = Router();

productRouter.get("/products",validation.product,productController.getAll);
productRouter.get("/product/:id",validation.product,productController.getSingle);
//productRouter.post("/CreateProducts",validation.product, productController.Create);
productRouter.post("/CreateProducts",validation.product,productController.Create);
productRouter.put("/UpdateProduct/:id",validation.product, productController.Update);
productRouter.delete("/DropProduct/:id",validation.product,productController.Delete);

export default productRouter;