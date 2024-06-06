import { DataTypes } from 'sequelize';
//const sequelize = new Sequelize('sqlite::memory:');
import sequelize from '../../db/config.js';
const CategoryModel = sequelize.define(
  'Category',
  {
    // Model attributes are defined here
    // color: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    // Brand: {
    //   type: DataTypes.STRING,
    //   // allowNull defaults to true
    // },
    // size:
    // {
    //     type: DataTypes.INTEGER,
    // },
   name: {
          type: DataTypes.STRING,
          allowNull: false
    },
  },
  {
    // Other model options go here
    timestamps : false
  },
);

// `sequelize.define` also returns the model
//console.log(User === sequelize.models.User); // true

export default CategoryModel;