//import salesRouter from "./Sales/index.js";
import userAuthenticationRouter from "./UserAuth/index.js";
import categoryRouter from "./categories/index.js";
import productSalesRouter from "./productSales/index.js";
import productRouter from "./products/index.js";

//salesRouter
const AllRoutes = [productRouter,productSalesRouter,categoryRouter,userAuthenticationRouter]

export default AllRoutes;