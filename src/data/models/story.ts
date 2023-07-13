import { Model, Sequelize, DataTypes } from 'sequelize';

class Story extends Model {

  static load(sequelize: Sequelize) {
    Story.init({
      id: {
        type: DataTypes.INTEGER,   
        primaryKey: true,
        autoIncrement: true
      },   
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      mediaType: DataTypes.STRING,
      mediaId: DataTypes.STRING,
      isEnabled: DataTypes.BOOLEAN,
      userId: DataTypes.INTEGER,
    }, {
      sequelize,
      modelName: 'Story',
    });
    
  }

  static associate(sequelize: Sequelize) {
    const { models } = sequelize;
    Story.belongsTo(models.User);
  }
}

export default Story;