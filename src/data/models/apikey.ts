import { Model, Sequelize, DataTypes } from 'sequelize';

class ApiKey extends Model {

  static load(sequelize: Sequelize) {
    ApiKey.init({
      id: {
        type: DataTypes.INTEGER,   
        primaryKey: true,
        autoIncrement: true
      },   
      value: DataTypes.STRING,
      isEnabled: DataTypes.BOOLEAN,
      userId: DataTypes.INTEGER,
    }, {
      sequelize,
      modelName: 'ApiKey',
    });
    
  }

  static associate(sequelize: Sequelize) {
    const { models } = sequelize;
    ApiKey.belongsTo(models.User);
  }
}

export default ApiKey;