import ProductSalesModel from "../../models/productSales/index.js";
import ProductModel from "../../models/products/index.js";
import SalesModel from "../../models/sales/index.js";


const productSalesController = {
    getAll : async (req,res) => {
        try {
            const findAll = await ProductSalesModel.findAll({
                
            
            });
            res.status(200).json({AllProductSales:"Find All", AllProductSales: findAll})
        } catch (error) {
            res.status(500).json({message:"Internal server error"})
        }
    },

    getSingle : async (req,res) => {
        try {
            const getSingle = await ProductSalesModel.findByPk(id,{
                include : [
                    {
                        model : SalesModel, include : [ProductModel]
                    }
                ]
            });
            if(!getSingle) {
                return res.status(404).json({Warning : "Not found"})
            }
            res.status(200).json({OneProductSale:"Found One", singleProductSale: getSingle})
        } catch (error) {
            res.status(500).json({message:"Internal server error"})
        }
    },

    Create : async (req,res) => {
        try {
            const payload = req.body; 
            console.log(payload);
            const createProducts = new ProductSalesModel();
            createProducts.quantity = payload.quantity;
            createProducts.price = payload.price;
            await createProducts.save();
            if(createProducts == -1){
                return res.status(404).json({Failure: "Not Found"})
            }
          /* LOGIC :  if any of field returns null delete the table! */
            res.status(200).json({Success:"Created Successfully", productSales : createProducts})
        } catch (error) {
            console.log(error)
            res.status(500).json({message:"Internal server error"})
        }
    },
    Update : async (req,res) => {
        try {
            const {id} = req.params;
            const payload = req.body;

            const updateProducts = await ProductSalesModel.findByPk(id);
            if(updateProducts == -1){
                return res.status(404).json({warning: "Not found"})
            }
            if(payload.quantity){
                updateProducts.quantity = payload.quantity
            }
            if(payload.price){
                updateProducts.price = payload.price
            }
           res.status(200).json({successFullyUpdated: "Updated successfully", Updation : updateProducts})

        } catch (error) {
            res.status(500).json({message:"Internal server error"})  
        }
    },
    Delete : async (req,res) => {
        try {
            const {id} = req.params
            const dropProducts = await ProductSalesModel.destroy({
                where : {
                    id: id
                }
            })
            if(dropProducts == -1) {
                 return res.status(404).json({message : "Not found"})
            }
            res.status(200).json({Drop : "Deleted Successfully"})
        } catch (error) {
            res.status(500).json({message:"Internal server error"})  
        }
    }
}

export default productSalesController;