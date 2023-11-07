import { DataTypes, QueryInterface } from 'sequelize';

const table = 'ApiKeys';
const column = 'userId';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.addColumn(
    table, 
    column, 
    {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    }
  );
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.removeColumn(table, column);
}
