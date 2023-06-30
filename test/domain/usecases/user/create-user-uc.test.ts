import CreateUserUC from "../../../../src/domain/usecases/user/create-user-uc";
import db from "../../../../src/data/models";
import userFactory from "../../../factory/user-factory";

describe('CreateUserUC test.', () => {
  let usecase: CreateUserUC;

  beforeAll(() => {
    usecase = new CreateUserUC(db);
  });

  test('Success case.', async () => {
    const userData = userFactory({});
    const user = await usecase.execute(userData);
    const userJSON = user.toJSON();

    expect(userJSON.name).toEqual(userData.name);
    expect(userJSON.email).toEqual(userData.email);
    expect(userJSON.password).not.toBeNull();

    user.destroy();
  });
});
