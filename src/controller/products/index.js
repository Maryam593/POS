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
                   // attributes : ['name']
                   //attribute is use to filter out!!
                   }
                ]
            });
            res.status(200).json({AllProducts:"Find All", AllProducts: findAll})
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
            res.status(200).json({singleProduct:"Found One", singleProduct: getSingle})
        } catch (error) {
            console.log(error)
            res.status(500).json({message:"Internal server error"})
        }
    },

    Create : async (req,res) => {
        try {
      //PROBLEM: Data is not showing in PivotTable
      //SOLUTION: data is linked with model but not with controllers

      //*********************-----**********************
      //*********************STEPS**********************
      //*********************-----**********************

        //1. destructring to collect all data
        //to save from anykind of reference error.. its preferable to use DESTRUCTRING
        let { category, name, stock, rate } = req.body;
        console.log(req.body,"payload");
      //2. save product Data in a new variable
    const productData = { name, stock, rate };
    //3. create a new product/Array
    const newProduct = await ProductModel.create(productData);
    //6. save the data (optional)
    //await newProduct.save();
    //4. find Category
    //meaning: 
    if (category && category.length > 0) {
        //fetch the category from category model
      const categories = await CategoryModel.findAll({
        where: { id: category },
      });
     
    //5. creating category in product mode;
      if (categories.length > 0) {
        await newProduct.addCategories(categories);
      }
    }
    else{
        res.status(400).json({
            Warning: `category on this id ${id} is not found`
        })
    }
    res.status(200).json({ Success: "Created Successfully", product: newProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
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
           res.status(200).json({UpdateSuccessFully: "Updated successfully", updatedProducts : updateProducts})

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
            res.status(200).json({DropProduct : "Deleted Successfully"})
        } catch (error) {
            res.status(500).json({message:"Internal server error"})  
        }
    }
}

export default productController;