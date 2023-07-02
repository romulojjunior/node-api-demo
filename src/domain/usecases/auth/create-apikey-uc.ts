import { Sequelize } from "sequelize";
import { ApiKey } from "../../../data/models";
import { randomUUID } from "crypto";
import ApiKeyUtils from "../../utils/apikey-utils";

class CreateApikeyUC {
  private db: Sequelize;

  constructor(db: Sequelize) {
    this.db = db;
  }

  async execute(params : { userId: number }): Promise<ApiKey> {
    const { ApiKey } = this.db.models;
    const apiKey = ApiKeyUtils.create(randomUUID());

    return await ApiKey.create({
      value: apiKey,
      userId: params.userId,
      isEnabled: true
    });
  }
}

export default CreateApikeyUC;