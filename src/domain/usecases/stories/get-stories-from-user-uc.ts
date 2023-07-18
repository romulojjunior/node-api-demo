import { Sequelize } from "sequelize";
import { Story } from "../../../data/models";

class GetStoriesFromUserUC {
  private db: Sequelize;

  constructor(db: Sequelize) {
    this.db = db;
  }

  async execute(params: { userId: number }): Promise<Story[]> {
    const { Story } = this.db.models;

    return await Story.findAll({
      where: {
        userId: params.userId,
      }
    });
  }
}

export default GetStoriesFromUserUC;