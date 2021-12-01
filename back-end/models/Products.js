const ProductsModel = (sequelize, Datatypes) => {
  const Products = sequelize.define('products', {
    name: Datatypes.STRING,
    price: Datatypes.DECIMAL(10, 2),
    urlImage: Datatypes.STRING,
  },
  { timestamps: false });

  Products.associate = (models) => {
    Products.belongsToMany(models.sales, {
      through: 'sales_products',
      as: 'sales',
      foreignKey: 'productId',
    });
  };

  return Products;
};

module.exports = ProductsModel;
