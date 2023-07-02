import { Sequelize } from "sequelize";
import { User } from "../../../data/models";
import PasswordUtils from "../../utils/password-utils";

class AuthenticateUserUC {
  private db: Sequelize;

  constructor(db: Sequelize) {
    this.db = db;
  }

  async execute(params: {
    email: string, 
    password: string, 
  }) : Promise<User> {
    const { User } = this.db.models;

    const currentUser = await User.findOne({
      where: {
        email: params.email,
      }
    });

    if (currentUser) {
      const currentUserJSON = await currentUser.toJSON();
      const isValid = PasswordUtils.validate(params.password, currentUserJSON.password);
  
      if (isValid) {
        return currentUser;
      }
    }

    throw new InvalidCredentialsError();
  }
}

class InvalidCredentialsError extends Error {}

export default AuthenticateUserUC;