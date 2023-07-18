import CreateStoryUC from "../../../../src/domain/usecases/stories/create-story-uc";
import db from "../../../../src/data/models";
import userFactory from "../../../factory/user-factory";
import PasswordUtils from "../../../../src/domain/utils/password-utils";
import MediaType from "../../../../src/data/models/media-type";

describe('CreateStoryUC test.', () => {
  let usecase: CreateStoryUC;

  beforeAll(() => {
    usecase = new CreateStoryUC(db);
  });

  test('Success case.', async () => {
    const { User } = db.models;
    const userPassword = '12341234';
    
    const user = await User.create(userFactory({
      password: PasswordUtils.createHash(userPassword)
    }));

    const userId: number = user.toJSON().id;

    const story = await usecase.execute({
      userId: userId,
      title: 'Mocked Title',
      description: 'Mocked Content',
      mediaType: MediaType.image.toString(),
      mediaId: 'ywdvubeinforgpbt234535etr'
    });

    expect(story).not.toBeUndefined();

    await story.destroy();

    await user.destroy();
  });
});
