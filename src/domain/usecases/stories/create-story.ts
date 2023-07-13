import { Sequelize } from "sequelize";
import { Story } from "../../../data/models";

class CreateStoryUC {
  private db: Sequelize;

  constructor(db: Sequelize) {
    this.db = db;
  }

  async execute(params: {
    userId: number, 
    title: string, 
    description: string, 
    mediaType: string,
    mediaId: string
  }): Promise<Story> {

    if (!params.title) {
      throw new InvalidTitleError();
    }

    if (!params.description) {
      throw new InvalidDescriptionError();
    }

    const { Story } = this.db.models;

    return await Story.create({
      userId: params.userId,
      title: params.title,
      description: params.description,
      mediaType: params.mediaType,
      mediaId: params.mediaId,
      isEnabled: true,
    });
  }
}

export class InvalidTitleError extends Error {}
export class InvalidDescriptionError extends Error {}

export default CreateStoryUC;