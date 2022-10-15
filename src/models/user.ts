import { Model, Sequelize, DataTypes } from 'sequelize';

class User extends Model {
  // static associate(models) {
  //   // define association here
  // }

  static load(sequelize: Sequelize) {
    User.init({
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING
    }, {
      sequelize,
      modelName: 'User',
    });
  }
}

export default User;
