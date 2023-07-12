import { Sequelize } from "sequelize";

class DestroyUserUC {
  private db: Sequelize;

  constructor(db: Sequelize) {
    this.db = db;
  }

  async execute(params: { id: number }) : Promise<boolean> {
    const { User } = this.db.models;
    
      const qty = await User.destroy({
        where: {
          id: params.id,
        }
      });  

      if (qty == 0) {
        throw new UserNotFoundError();
      }

      return qty == 1;
  }
}

export class UserNotFoundError extends Error {}

export default DestroyUserUC;