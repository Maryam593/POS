import { DataTypes } from 'sequelize';
//const sequelize = new Sequelize('sqlite::memory:');
import sequelize from '../../db/config.js';
const TokenModel = sequelize.define(
  'Token',
  {
    // Model attributes are defined here
    token: {
      type: DataTypes.STRING(500),
      //allowNull: false,
    },
   
  },
  {
    // Other model options go here
    timestamps : false
  },
);

// `sequelize.define` also returns the model
//console.log(User === sequelize.models.User); // true

export default TokenModel;