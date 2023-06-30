import { Sequelize } from "sequelize";
import db, { User } from "../../../data/models";
import PasswordUtils from "../../utils/password-utils";

interface Params {
  name: string, 
  email: string, 
  password: string, 
  password_conf: string
}

class CreateUserUC {
  private db: Sequelize;

  constructor(db: Sequelize) {
    this.db = db;
  }

  async execute({name, email, password, password_conf} : Params) : Promise<User> {
    if (password !== password_conf) {
      throw new InvalidPasswordError();
    }

    if (name.length < 4) {
      throw new InvalidNameLengthError();
    }

    if (!email.includes('@')) {
      throw new InvalidEmailFormatError();
    }

    const passwordHash = PasswordUtils.createHash(password);
    return await db.models.User.create({
      name, email, password: passwordHash
    });
  }
}

class InvalidPasswordError extends Error {}
class InvalidNameLengthError extends Error {}
class InvalidEmailFormatError extends Error {}

export default CreateUserUC;