import db, { User } from "../../../../src/data/models";
import userFactory from "../../../factory/user-factory";
import AuthenticateUserUC from "../../../../src/domain/usecases/auth/authenticate-user-uc";
import PasswordUtils from "../../../../src/domain/utils/password-utils";


describe('AuthenticateUserUC test.', () => {
  let usecase: AuthenticateUserUC;

  beforeAll(() => {
    usecase = new AuthenticateUserUC(db);
  });

  test('Success case.', async () => {
    const userPassword = '12341234';
    
    const user = await User.create(userFactory({
      password: PasswordUtils.createHash(userPassword)
    }));    

    const { email } = await (await user.toJSON());
    
    const userAuthenticated = await usecase.execute({ email, password: userPassword });
    const userAuthenticatedJSON = await userAuthenticated.toJSON();
  
    expect(userAuthenticatedJSON.email).toEqual(email);    
    await user.destroy();
  });
});
