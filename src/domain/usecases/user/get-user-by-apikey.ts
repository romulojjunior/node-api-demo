import { Sequelize } from "sequelize";
import { User } from "../../../data/models";

class GetUserByApiKeyUC {
  private db: Sequelize;

  constructor(db: Sequelize) {
    this.db = db;
  }

  async execute(params: {
    apikey: string, 
  }) : Promise<User> {
    const { User, ApiKey } = this.db.models;

    const currentApikey = await ApiKey.findOne({
      where: {
        value: params.apikey,
      },
    });

    if (currentApikey) {
      const currentUser = await User.findOne({
        where: {
          id: currentApikey.toJSON().userId as number,
        }
      });

  
      if (currentUser) {
        return currentUser;
      }
    }

    throw new UserNotFoundError();
  }
}

export class UserNotFoundError extends Error {}

export default GetUserByApiKeyUC;