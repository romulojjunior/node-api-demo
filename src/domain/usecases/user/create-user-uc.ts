import { Sequelize } from "sequelize";
import { User } from "../../../data/models";
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
    passwordConf: string
  }) : Promise<User> {

    if (params.password !== params.passwordConf) {
      throw new InvalidPasswordError();
    }

    if (params.name.length < 4) {
      throw new InvalidNameLengthError();
    }

    if (!params.email.includes('@')) {
      throw new InvalidEmailFormatError();
    }

    const passwordHash = PasswordUtils.createHash(params.password);
    const { User } = this.db.models;

    const hasUser = await User.findOne({
      where: { email: params.email }
    });

    if (hasUser) {
      throw new EmailUnavailableError();
    }

    return await User.create({
      name: params.name, 
      email: params.email, 
      password: passwordHash
    });
  }
}

export class InvalidPasswordError extends Error {}
export class InvalidNameLengthError extends Error {}
export class InvalidEmailFormatError extends Error {}
export class EmailUnavailableError extends Error {}

export default CreateUserUC;