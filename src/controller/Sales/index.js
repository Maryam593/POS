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
      res.status(200).json({ SingleSale: "Found One", Sale: getSingle });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

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
        return res.status(404).json({ warning: "Not found" });
      }
      res.status(200).json({ DropSale: "Deleted Successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

export default salesController;
