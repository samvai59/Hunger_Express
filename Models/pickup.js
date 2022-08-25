const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pickup', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cart_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    delivery_address_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    restaurant_manager_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    payment_info_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    voucher_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    pin: {
      type: DataTypes.STRING(6),
      allowNull: false
    },
    target_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    rider_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Order_time: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Delivery_time: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'pickup',
    schema: 'public',
    timestamps: false
  });
};
