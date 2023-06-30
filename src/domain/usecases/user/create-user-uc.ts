import { Sequelize } from "sequelize";
import db, { User } from "../../../data/models";
import PasswordUtils from "../../utils/password-utils";

class CreateUserUC {
  private db: Sequelize;

  constructor(db: Sequelize) {
    this.db = db;
  }

  async execute(params: {
    name: string, 
    email: string, 
    password: string, 
    password_conf: string
  }) : Promise<User> {

    if (params.password !== params.password_conf) {
      throw new InvalidPasswordError();
    }

    if (params.name.length < 4) {
      throw new InvalidNameLengthError();
    }

    if (!params.email.includes('@')) {
      throw new InvalidEmailFormatError();
    }

    const passwordHash = PasswordUtils.createHash(params.password);
    return await db.models.User.create({
      name: params.name, 
      email: params.email, 
      password: passwordHash
    });
  }
}

class InvalidPasswordError extends Error {}
class InvalidNameLengthError extends Error {}
class InvalidEmailFormatError extends Error {}

export default CreateUserUC;