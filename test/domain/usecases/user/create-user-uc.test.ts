import CreateUserUC from "../../../../src/domain/usecases/user/create-user-uc";
import db from "../../../../src/domain/models";

describe('CreateUserUC test.', () => {
  let usecase: CreateUserUC;

  beforeAll(() => {
    usecase = new CreateUserUC(db);
  });

  test('Success case.', async () => {
    const userData = {
      name: 'nick',
      email: 'nick@test.com',
      password: '1234',
      password_conf: '1234'
    };

    const user = await usecase.execute(userData);
    const userJSON = user.toJSON();

    expect(userJSON.name).toEqual(userData.name);
    expect(userJSON.email).toEqual(userData.email);
    expect(userJSON.password).not.toBeNull();

    user.destroy();
  });
});
