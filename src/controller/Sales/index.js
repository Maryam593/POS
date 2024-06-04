// import SalesModel from "../../models/sales/index.js";


// const salesController = {
//     getAll : async (req,res) => {
//         try {
//             const findAll = await SalesModel.findAll();
//             res.status(200).json({message:"Find All", data: findAll})
//         } catch (error) {
//             res.status(500).json({message:"Internal server error"})
//         }
//     },

//     getSingle : async (req,res) => {
//         try {
//             const getSingle = await SalesModel.findByPk(id);
//             if(!getSingle) {
//                 return res.status(404).json({message : "Not found"})
//             }
//             res.status(200).json({message:"Found One", data: getSingle})
//         } catch (error) {
//             res.status(500).json({message:"Internal server error"})
//         }
//     },

//     Create : async (req,res) => {
//         try {
//             const payload = req.body; 
//             const createProducts = new SalesModel();
//             createProducts.name = payload.name;
//             createProducts.stock = payload.stock;
//             await createProducts.save();
//             if(createProducts == -1){
//                 return res.status(404).json({message: "Not Found"})
//             }
//             res.status(200).json({message:"Created Successfully", data : getAll})
//         } catch (error) {
//             res.status(500).json({message:"Internal server error"})
//         }
//     },
//     Update : async (req,res) => {
//         try {
//             const {id} = req.params;
//             const payload = req.body;

//             const updateProducts = await SalesModel.findByPk(id);
//             if(updateProducts == -1){
//                 return res.status(404).json({message: "Not found"})
//             }
//             if(payload.name){
//                 createProducts.name = payload.name
//             }
//             if(payload.stock){
//                 createProducts.stock = payload.stock
//             }
//            res.status(200).json({message: "Updated successfully"})

//         } catch (error) {
//             res.status(500).json({message:"Internal server error"})  
//         }
//     },
//     Delete : async (req,res) => {
//         try {
//             const {id} = req.params
//             const deleteProducts = await SalesModel.destroy({
//                 where : {
//                     id: id
//                 }
//             })
//             if(deleteProducts == -1) {
//                  return res.status(404).json({message : "Not found"})
//             }
//             res.status(200).json({message : "Deleted Successfully"})
//         } catch (error) {
//             res.status(500).json({message:"Internal server error"})  
//         }
//     }
// }

// export default salesController;