import DestroyStoryUC, { StoryNotFoundError } from "../../../../src/domain/usecases/stories/destroy-story-uc";
import db from "../../../../src/data/models";
import userFactory from "../../../factory/user-factory";
import PasswordUtils from "../../../../src/domain/utils/password-utils";
import storyFactory from "../../../factory/story-factory";

describe('DestroyStoryUC test.', () => {

  let usecase: DestroyStoryUC;

  beforeAll(() => {
    usecase = new DestroyStoryUC(db);
  });

  test('Success case.', async () => {
    const { User, Story } = db.models;
    const userPassword = '12341234';
    
    const user = await User.create(userFactory({
      password: PasswordUtils.createHash(userPassword)
    }));

    const userId: number = user.toJSON().id;
    const story = await Story.create(storyFactory({ userId }));
    const storyId: number = story.toJSON().id;

    const isDstroyed = await usecase.execute({
      id: storyId,
      userId: userId,
    });

    expect(isDstroyed).toBeTruthy();

    await user.destroy();
  });

  test('When an story is not found', async () => {
    await expect(async () => {
      await usecase.execute({ id: -1, userId: -1 });
    }).rejects.toThrow(StoryNotFoundError);
});
});
