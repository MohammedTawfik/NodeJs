const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../util/dbConfig');

const CartItem = sequelize.define('cartItem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  cartId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = CartItem;
