'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sales', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      totalPrice: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      deliveryAddress: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      deliveryNumber: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: { model: 'users', key: 'id' },
      },
      createdAt: {
        allowNull: false,
        defaultValue: Sequelize.NOW,
        type: Sequelize.DATE,
        name: 'saleDate',
      },
      updatedAt: {
        allowNull: false,
        defaultValue: Sequelize.NOW,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('sales');
  }
};
