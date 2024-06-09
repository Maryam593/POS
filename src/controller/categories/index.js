import CategoryModel from "../../models/Categories/index.js";

const categroyController = {

    getAll : async (req,res) => {

        try {
            const getAllCategories = await CategoryModel.findAll();
            res.status(200).json({AllCategories:"Find All", getAllCategories: getAllCategories})
        } catch (error) {
            res.status(500).json({message:"Internal server error"})
        }
    },

    
    getSingle: async (req,res) => {
        try {
            const id = req.params.id;
            const getSingle = await CategoryModel.findByPk(id);
            if(!getSingle){
                return res.status(404).json({message: "Not found"})
            }
            res.status(200).json({SingleCategory:"Found Single One", getSingleCategory : getSingle})
        } catch (error) {
            res.status(500).json({message:"Internal server error"})
        }
    },

    //create category

    Create : async (req,res) => {
        try {
            const payload = req.body; 
           const  category = new CategoryModel;
            // createCategory.color = payload.color;
            // createCategory.size = payload.size;
            // createCategory.Brand = payload.Brand;
            category.name = payload.name
            await category.save();
            if(!category) {
                res.status(404).json({message: "Not found"})
            }

            res.status(200).json({CategoryCreated: "Created!", category : category})
        } catch (error) {
            console.log(error)
            res.status(500).json({message:"Internal server error"})
        }
    },

    Delete : async(req,res) => {
        try {
            const {id} = req.params
            const DropCategory = await CategoryModel.destroy({
                where : {
                    id : id
                }
            })
            if(DropCategory == -1) {
                return res.status(404).json({message : "Not found"})
            }
            res.status(200).json({Success : "Deleted Successfully"})
        } catch (error) {
            res.status(500).json({message:"Internal server error"})
        }
    }

   

}

export default categroyController;