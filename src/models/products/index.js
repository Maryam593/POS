import { DataTypes } from 'sequelize';
//const sequelize = new Sequelize('sqlite::memory:');
import sequelize from '../../db/config.js';
const ProductModel = sequelize.define(
  'Product',
  {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stock: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
    rate:
    {
        type: DataTypes.INTEGER,
       // allowNull : false
    },
  
  },
  {
    // Other model options go here
    timestamps : false
  },
);

// `sequelize.define` also returns the model
//console.log(User === sequelize.models.User); // true

export default ProductModel;