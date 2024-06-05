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
            const getSingle = await SalesModel.findByPk(id);
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
            const payload = req.body; 
            const createSales = new SalesModel();
            createSales.totalAmount = payload.totalAmount;
            
            await createSales.save();
            if(!createSales){
                return res.status(404).json({message: "Not Found"})
            }
            res.status(200).json({message:"Created Successfully", Sales : createSales})
        } catch (error) {
            res.status(500).json({message:"Internal server error"})
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