import { DataTypes } from 'sequelize';
//const sequelize = new Sequelize('sqlite::memory:');
import sequelize from '../../db/config.js';
const UserAuthenticationModel = sequelize.define(
  'User',
  {
    // Model attributes are defined here
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      // allowNull defaults to true
      unique : true,
    },
    password:
    {
        type: DataTypes.INTEGER,
        validate : {
            len : [4-16]
        }
    },
  },
  {
    // Other model options go here
    timestamps : false
  },
);

// `sequelize.define` also returns the model
//console.log(User === sequelize.models.User); // true

export default UserAuthenticationModel;