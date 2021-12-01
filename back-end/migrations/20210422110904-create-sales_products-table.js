'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sales_products', {
      saleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: false,
        references: {
          model: 'sales',
          key: 'id',
          unique: 'unique-product-per-sale',
        },
        onDelete: 'CASCADE',
      },
      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: false,
        references: {
          model: 'products',
          key: 'id',
          unique: 'unique-product-per-sale',
        },
        onDelete: 'CASCADE',
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('sales_products');
  }
};
