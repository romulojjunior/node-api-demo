import { Model, Sequelize, DataTypes } from 'sequelize';

class ApiKey extends Model {
  // static associate(models) {
  //   // define association here
  // }

  static load(sequelize: Sequelize) {
    ApiKey.init({
      value: DataTypes.STRING,
      isEnabled: DataTypes.BOOLEAN
    }, {
      sequelize,
      modelName: 'ApiKey',
    });
  }
}

export default ApiKey;