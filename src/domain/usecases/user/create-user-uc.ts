import { Sequelize } from "sequelize";
import db, { User } from "../../models";

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

    // TODO: create password hash
    return await db.models.User.create({
      name, email, password
    });
  }
}

class InvalidPasswordError extends Error {}
class InvalidNameLengthError extends Error {}
class InvalidEmailFormatError extends Error {}

export default CreateUserUC;