import GetStoriesFromUserUC from "../../../../src/domain/usecases/stories/get-stories-from-user-uc";
import db from "../../../../src/data/models";
import userFactory from "../../../factory/user-factory";
import PasswordUtils from "../../../../src/domain/utils/password-utils";
import storyFactory from "../../../factory/story-factory";

describe('GetStoriesFromUserUC test.', () => {
  let usecase: GetStoriesFromUserUC;

  beforeAll(() => {
    usecase = new GetStoriesFromUserUC(db);
  });

  test('Success case.', async () => {
    const { User, Story } = db.models;
    const userPassword = '12341234';
    
    const user = await User.create(userFactory({
      password: PasswordUtils.createHash(userPassword)
    }));

    const userId: number = user.toJSON().id;
    const story01 = await Story.create(storyFactory({ userId }));
    const story02 = await Story.create(storyFactory({ userId }));
    const story03 = await Story.create(storyFactory({ userId }));

    const stories = await usecase.execute({ userId });

    expect(story01).not.toBeUndefined();
    expect(story02).not.toBeUndefined();
    expect(story03).not.toBeUndefined();

    expect(stories.length).toBe(3);

    await story01.destroy();
    await story02.destroy();
    await story03.destroy();

    await user.destroy();
  });
});
