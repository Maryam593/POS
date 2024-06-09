import ProductSalesModel from "../../models/productSales/index.js";
import ProductModel from "../../models/products/index.js";
import SalesModel from "../../models/sales/index.js";

const salesController = {
  getAll: async (req, res) => {
    try {
      const findAll = await SalesModel.findAll();
      res.status(200).json({ message: "Find All", AllSales: findAll });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getSingle: async (req, res) => {
    try {
      const { id } = req.params;
      const getSingle = await SalesModel.findByPk(id, {
        //incude all data here!
        include: [
          {
            model: ProductSalesModel,
            include: [ProductModel],
          },
        ],
      });
      if (!getSingle) {
        return res.status(404).json({ AllSales: "Not found" });
      }
      res.status(200).json({ message: "Found One", Sale: getSingle });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  //     Create : async (req,res) => {
  //         try {
  //             // Step 1: Collecting Data
  //             let  { ProductSales } = req.body;

  //             // Step 2: Calculating Total Sale Amount and Reducing Product Stock
  //             const salesproductData = [];
  //             let totalAmount = 0;

  //            // Step 1: Ensure ProductSales is an array and has valid items
  // if (!Array.isArray(ProductSales) || ProductSales.length === 0) {
  //     return res.status(400).json({ error: "ProductSales is empty or not an array" });
  //   }

  //             for (const item of ProductSales) {
  //               if (!item) {
  //                 console.log("Null", item);
  //                 continue; // Skip invalid items
  //               }

  //               const product = await ProductModel.findByPk(item.id);

  //               if (!product) {
  //                 return res.status(400).json({ warning: `Product with ID ${item.id} not found` });
  //               }

  //               if (item.quantity > product.stock) {
  //                 return res.status(400).json({ message: `Insufficient stock for product with ID ${item.id}` });
  //               }

  //               totalAmount = totalAmount + (item.rate * item.quantity);

  //               product.stock = product.stock - item.quantity; // Reduce stock
  //               await product.save(); // Save updated product

  //               salesproductData.push({ ...item, Sales: Sales.id }); // Add to sales product data
  //             }

  //             // Step 3: Bulk Create Sales Product Records
  //             await ProductSalesModel.bulkCreate(salesproductData);

  //             // Step 4: Respond with Success Message and Data
  //             res.status(200).json({ message: "Sale created successfully", totalAmount, salesproductData });
  //           } catch (error) {
  //             // Step 5: Handle Errors
  //             console.log(error);
  //             res.status(500).json({ error: "Internal Server Error" });
  //           }

  //     },
  create: async (req, res) => {
    try {
     
      const { name, price } = req.body;
      const hello = req.body;
      const sale = await SalesModel.create({ totalAmount: 0 }); // Save sale first to generate id
      const salesProduct = [];
      console.log("request payload:", req.body);

      for (let i = 0; i < hello.salesProducts.length; i++) {
        const ele = hello.salesProducts[i];
        console.log("Processing product:", ele);

        const product = await ProductModel.findByPk(ele.ProductId);
        if (!product) {
          return res.status(400).json({
            message: "Product not found",
          });
        }

        if (ele.productQuantity > product.stock) {
          return res.status(400).json({
            message: "The product " + product.name + " has insufficient stock",
          });
        }

        salesProduct.push({
          ...ele,
          // price: product.price,
          SaleId: sale.id, // Assign the SaleId
        });
      }

      console.log("Sales Product data before bulk create:", salesProduct);

      await ProductSalesModel.bulkCreate(salesProduct);

    

      const totalAmount = salesProduct.reduce((sum, current) => {
        // Log current values for debugging
        console.log(
          `Price: ${current.price}, Quantity: ${current.productQuantity}`
        );

        // Add defensive checks for undefined, null, or non-numeric values
        const price = Number(current.price);
        const quantity = Number(current.quantity);
        console.log(price)
        console.log(quantity)
        if (isNaN(price) || isNaN(quantity)) {
          // Handle invalid or missing values
          console.error("Invalid or missing price or quantity:", current);
          return sum;
        }

        // Perform the calculation
        console.log(`Calculating sum: ${sum} + (${price} * ${quantity})`);
        return sum + price * quantity;
      }, 0);

      console.log("Total Amount calculated:", totalAmount);

      // Assuming the existence of a Sale model and the creation of a new sale
      // Replace Sale.create(...) with your actual code to save the sale to the database

      const newSale = await SalesModel.create({
        totalAmount: isNaN(totalAmount) ? null : totalAmount,
        // Other properties of the sale...
      });

      console.log("Sale saved with total amount:", newSale.totalAmount);

      for (const sp of salesProduct) {
        const product = await ProductModel.findByPk(sp.ProductId);
        product.stock -= sp.quantity;
        await product.save();
      }

      res.status(200).json({ message: "Sale created", sale,totalAmount });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  Update: async (req, res) => {
    try {
      const { id } = req.params;
      const payload = req.body;

      const updateSales = await SalesModel.findByPk(id);
      if (updateSales == -1) {
        return res.status(404).json({ message: "Not found" });
      }
      if (payload.totalAmount) {
        updateSales.totalAmount = payload.totalAmount;
      }

      res.status(200).json({ Updation: "Updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },
  Delete: async (req, res) => {
    try {
      const { id } = req.params;
      const deleteSales = await SalesModel.destroy({
        where: {
          id: id,
        },
      });
      if (deleteSales == -1) {
        return res.status(404).json({ message: "Not found" });
      }
      res.status(200).json({ DropSale: "Deleted Successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

export default salesController;
