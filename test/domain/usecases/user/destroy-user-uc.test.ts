import DestroyUserUC, { UserNotFoundError } from "../../../../src/domain/usecases/user/destroy-user-uc";
import db from "../../../../src/data/models";
import userFactory from "../../../factory/user-factory";
import PasswordUtils from "../../../../src/domain/utils/password-utils";

describe('DestroyUserUC test.', () => {
  let usecase: DestroyUserUC;

  beforeAll(() => {
    usecase = new DestroyUserUC(db);
  });

  test('Success case.', async () => {
    const { User } = db.models;
    const userPassword = '12341234';
    
    const user = await User.create(userFactory({
      password: PasswordUtils.createHash(userPassword)
    }));    

    const userJSON = user.toJSON();
    
    const isDestroyed = await usecase.execute({
      id: userJSON.id,
    });
    
    expect(isDestroyed).toBeTruthy();
  });

  test('When an user is not found', async () => {
      await expect(async () => {
        await usecase.execute({id: -1 });
      }).rejects.toThrow(UserNotFoundError);
  });
});
