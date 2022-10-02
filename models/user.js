// ** Will contain:
  // - First name
  // - Last name
  // - Username
  // - Email
  // - Password 
  
// TODO: Make sure bcrypt is in .json
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require ('../config/connection');
const { Router } = require('express');
const router = require('../controllers');

class User extends Model {
  checkPassword(loginPw) {

// * Will encrypt password
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        length: [8],
      },
    },
  },
  {
    // * encrypts password data
    // !!!!!!!!! COMMENT BCRYPT BACK IN ONCE ROUTES ARE FIGURED OUT !!!!!!!!!!
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;