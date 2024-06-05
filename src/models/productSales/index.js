import { DataTypes } from 'sequelize';
//const sequelize = new Sequelize('sqlite::memory:');
import sequelize from '../../db/config.js';
import SalesModel from '../sales/index.js';
import ProductModel from '../products/index.js';
const ProductSalesModel = sequelize.define(
  'ProductSales',
  {
    // Model attributes are defined here
  
    // quantity: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false
    // },
   
    price : {
      type : DataTypes.FLOAT,

    },
    //error *******
    quantity : {
      type: DataTypes.STRING,
    }
    
  },
  {
    // Other model options go here
    timestamps : false
  },
);

// `sequelize.define` also returns the model
//console.log(User === sequelize.models.User); // true

export default ProductSalesModel;

SalesModel.hasMany(ProductSalesModel);
ProductSalesModel.belongsTo(SalesModel);

ProductModel.hasMany(ProductSalesModel);
ProductSalesModel.belongsTo(ProductModel);