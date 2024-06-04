import { DataTypes } from 'sequelize';
//const sequelize = new Sequelize('sqlite::memory:');
import sequelize from '../../db/config.js';
const SalesModel = sequelize.define(
  'Sales',
  {
    // Model attributes are defined here
    totalAmount: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  },
  {
    // Other model options go here
    timestamps : false
  },
);

// `sequelize.define` also returns the model
//console.log(User === sequelize.models.User); // true

export default SalesModel;