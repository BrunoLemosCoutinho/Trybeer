const UsersModel = (sequelize, Datatypes) => {
  const Users = sequelize.define('users', {
    name: Datatypes.STRING,
    email: Datatypes.STRING,
    password: Datatypes.STRING,
    role: Datatypes.STRING,
  },
  { timestamps: false });

  Users.associate = (models) => {
    Users.hasMany(models.sales, {
      foreignKey: 'userId',
    });
  };

  return Users;
};

module.exports = UsersModel;
