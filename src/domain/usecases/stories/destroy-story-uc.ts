import { Sequelize } from "sequelize";

class DestroyStoryUC {
  private db: Sequelize;

  constructor(db: Sequelize) {
    this.db = db;
  }

  async execute(params: {
    id: number,
    userId: number, 
  }): Promise<boolean> {

    const { Story } = this.db.models;

    const qty = await Story.destroy({
      where: {
        id: params.id,
        userId: params.userId,
      }
    });

    if (qty == 0) {
      throw new StoryNotFoundError();
    }

    return qty == 1;
  }
}

export class StoryNotFoundError extends Error {}

export default DestroyStoryUC;