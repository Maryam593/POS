import ProductSalesModel from "../../models/productSales/index.js";
import ProductModel from "../../models/products/index.js";
import SalesModel from "../../models/sales/index.js";


const salesController = {
    getAll : async (req,res) => {
        try {
            const findAll = await SalesModel.findAll();
            res.status(200).json({message:"Find All", AllSales: findAll})
        } catch (error) {
            res.status(500).json({message:"Internal server error"})
        }
    },

    getSingle : async (req,res) => {
        try {
            const {id} = req.params;
            const getSingle = await SalesModel.findByPk(id,{

                //incude all data here!
                include : [{
                    model : ProductSalesModel, include : [ProductModel]
                }]
            });
            if(!getSingle) {
                return res.status(404).json({AllSales : "Not found"})
            }
            res.status(200).json({message:"Found One", Sale: getSingle})
        } catch (error) {
            console.log(error);
            res.status(500).json({message:"Internal server error"})
        }
    },

    Create : async (req,res) => {
        try {
          
        //*********  calculating total sale
        
        //1. collecting all data 
        const payload = req.body;
        
        //since all the working happens or fetching of data is in product sale.. we'll do: 

        const ProductSales = payload.ProductSales;
        //2. calcuating total amount 

        let totalAmount = 0; //sales total amount cant be null

        //creating an empty array to store calculates data 

        let salesproductData = [];
        //where main ID comes from -> Products 

    for (const item of ProductSales) {
        const product = await ProductModel.findByPk(item.name); //finding ID so we can work on it 

        if (!product) {
            return res.status(400).json({warning : `product on this ID is not found ${product.productId}`})
           
        }

        //3. Insufficiency of stock 
        if (item.quantity > product.stock) {
            return res.status(400).json({
              message: `Insufficient stock!  Available stock: ${product.stock}`
            });
          }
    }
    //4. calculation total amount for sale 
    totalAmount = item.rate * item.quantity;

    //5. Reduce Product Stock
    product.stock = product.stock - item.quantity;

    await product.save();
    
    //6. Push the whole data in to that empty array 
    salesproductData.push({
        ...item,
        Sales : Sales.id //assigning ID to sale
    });

    //7. 

    }
        catch(error) {
            console.log(error)
        res.status(500).json({Error: "Internal Server Error"})
        }
    },

    Update : async (req,res) => {
        try {
            const {id} = req.params;
            const payload = req.body;

            const updateSales = await SalesModel.findByPk(id);
            if(updateSales == -1){
                return res.status(404).json({message: "Not found"})
            }
            if(payload.totalAmount){
                updateSales.totalAmount = payload.totalAmount
            }
          
           res.status(200).json({Updation: "Updated successfully"})

        } catch (error) {
            res.status(500).json({message:"Internal server error"})  
        }
    },
    Delete : async (req,res) => {
        try {
            const {id} = req.params
            const deleteSales = await SalesModel.destroy({
                where : {
                    id: id
                }
            })
            if(deleteSales== -1) {
                 return res.status(404).json({message : "Not found"})
            }
            res.status(200).json({DropSale : "Deleted Successfully"})
        } catch (error) {
            res.status(500).json({message:"Internal server error"})  
        }
    }
}

export default salesController;