const SalesProductsModel = (sequelize, Datatypes) => {
  const SalesProducts = sequelize.define('sales_products', {
    quantity: Datatypes.STRING,
  }, { timestamps: false });

  return SalesProducts;
};

module.exports = SalesProductsModel;
