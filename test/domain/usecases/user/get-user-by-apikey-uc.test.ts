import db, { User, ApiKey } from "../../../../src/data/models";
import userFactory from "../../../factory/user-factory";
import GetUserByApiKeyUC from "../../../../src/domain/usecases/user/get-user-by-apikey";
import { randomUUID } from "crypto";

describe('GetUserByApiKeyUC test.', () => {
  let usecase: GetUserByApiKeyUC;

  beforeAll(() => {
    usecase = new GetUserByApiKeyUC(db);
  });

  test('Success case.', async () => {
    const { ApiKey } = db.models;
    const user = await User.create(userFactory({}));    

    const apiKeyValue = randomUUID();
    const apikey: ApiKey = await ApiKey.create({
      value: apiKeyValue,
      userId: user.toJSON().id,
      isEnabled: true
    });

    const currentUser = await usecase.execute({ apikey: apiKeyValue });
    expect(user.toJSON().id).toEqual(currentUser.toJSON().id);
    
    await apikey.destroy();
    await user.destroy();
  });
});
