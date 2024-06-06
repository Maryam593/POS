//import ProductModel from "../../models/products/index.js";
import CategoryModel from "../../models/Categories/index.js";
import ProductModel from "../../models/products/index.js";

const productController = {
    getAll : async (req,res) => {
        try {
            const findAll = await ProductModel.findAll({
                include : [
                   {
                    model : CategoryModel,
                    attributes : ['name']
                   }
                ]
            });
            res.status(200).json({message:"Find All", AllProducts: findAll})
        } catch (error) {
            console.log(error)
            res.status(500).json({message:"Internal server error"})
        }
    },

    getSingle : async (req,res) => {
        try {
            const {id} = req.params;
            const getSingle = await ProductModel.findByPk(id);

            if(!getSingle) {
                return res.status(404).json({message : "Not found"})
            }
            res.status(200).json({message:"Found One", singleProduct: getSingle})
        } catch (error) {
            console.log(error)
            res.status(500).json({message:"Internal server error"})
        }
    },

    Create : async (req,res) => {
        try {
            const payload = req.body;
             
            // const createProducts = new ProductModel();
            // createProducts.name = payload.name;
            // createProducts.stock = payload.stock;
            // createProducts.rate = payload.rate;
            // await createProducts.save();


            //--------for adding category in create 
            const createProducts = ProductModel.create({
                ...payload,
                category
            })
            await ProductModel.addCategory(category);
            if(!createProducts){
                return res.status(404).json({message: "Not Found"})
            }
            res.status(200).json({message:"Created Successfully", products : createProducts})
        } catch (error) {
            console.log(error)
            res.status(500).json({message:"Internal server error"})
        }
    },
    Update : async (req,res) => {
        try {
            const {id} = req.params;
            const payload = req.body;

            const updateProducts = await ProductModel.findByPk(id);
            if(updateProducts == -1){
                return res.status(404).json({message: "Not found"})
            }
            if(payload.name){
                updateProducts.name = payload.name
            }
            if(payload.stock){
                updateProducts.stock = payload.stock
            }
           res.status(200).json({message: "Updated successfully", updatedProducts : updateProducts})

        } catch (error) {
            res.status(500).json({message:"Internal server error"})  
        }
    },
    Delete : async (req,res) => {
        try {
            const {id} = req.params
            const deleteProducts = await ProductModel.destroy({
                where : {
                    id: id
                }
            })
            if(deleteProducts == -1) {
                 return res.status(404).json({message : "Not found"})
            }
            res.status(200).json({message : "Deleted Successfully"})
        } catch (error) {
            res.status(500).json({message:"Internal server error"})  
        }
    }
}

export default productController;