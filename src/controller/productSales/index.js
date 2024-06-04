import ProductSalesModel from "../../models/productSales/index.js";


const productSalesController = {
    getAll : async (req,res) => {
        try {
            const findAll = await ProductSalesModel.findAll();
            res.status(200).json({message:"Find All", AllProductSales: findAll})
        } catch (error) {
            res.status(500).json({message:"Internal server error"})
        }
    },

    getSingle : async (req,res) => {
        try {
            const getSingle = await ProductSalesModel.findByPk(id);
            if(!getSingle) {
                return res.status(404).json({message : "Not found"})
            }
            res.status(200).json({message:"Found One", singleProductSale: getSingle})
        } catch (error) {
            res.status(500).json({message:"Internal server error"})
        }
    },

    Create : async (req,res) => {
        try {
            const payload = req.body; 
            const createProducts = new ProductSalesModel();
            createProducts.qunatity = payload.qunatity;
            createProducts.price = payload.price;
            await createProducts.save();
            if(createProducts == -1){
                return res.status(404).json({message: "Not Found"})
            }
          /* LOGIC :  if any of field returns null delete the table! */
            res.status(200).json({message:"Created Successfully", productSales : createProducts})
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
                return res.status(404).json({message: "Not found"})
            }
            if(payload.quantity){
                updateProducts.quantity = payload.quantity
            }
            if(payload.price){
                updateProducts.price = payload.price
            }
           res.status(200).json({message: "Updated successfully", Updation : updateProducts})

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
            res.status(200).json({message : "Deleted Successfully"})
        } catch (error) {
            res.status(500).json({message:"Internal server error"})  
        }
    }
}

export default productSalesController;