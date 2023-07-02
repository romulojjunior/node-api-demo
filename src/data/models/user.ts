import { Model, Sequelize, DataTypes } from 'sequelize';

class User extends Model {

  static load(sequelize: Sequelize) {
    User.init({
      id: {
        type: DataTypes.INTEGER,   
        primaryKey: true,
        autoIncrement: true
      },      
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING
    }, {
      sequelize,
      modelName: 'User',
    });
  }

  static associate(sequelize: Sequelize) {
    const { models } = sequelize;
    User.hasMany(models.ApiKey, {
      onDelete: 'CASCADE'
    });
  }
}

export default User;
