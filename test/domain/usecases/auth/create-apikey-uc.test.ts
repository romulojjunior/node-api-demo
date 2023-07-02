import db, { User } from "../../../../src/data/models";
import userFactory from "../../../factory/user-factory";
import CreateApikeyUC from "../../../../src/domain/usecases/auth/create-apikey-uc";


describe('CreateApiKeyUC test.', () => {
  let usecase: CreateApikeyUC;

  beforeAll(() => {
    usecase = new CreateApikeyUC(db);
  });

  test('Success case.', async () => {
    const user = await User.create(userFactory({}));    
    const userId = await (await user.toJSON()).id;
    
    const apikey = await usecase.execute({ userId });
    const apiKeyJSON = await apikey.toJSON();
  
    expect(apiKeyJSON.userId).toEqual(userId);
    
    apikey.destroy();
    user.destroy();
  });
});
