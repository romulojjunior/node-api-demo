import express from 'express';
import db from '../../../../data/models';
import LoggerUtils from '../../../../domain/utils/logger-utils';
import GetStoriesFromUserUC from '../../../../domain/usecases/stories/get-stories-from-user-uc';
import GetUserByApiKeyUC, { UserNotFoundError } from '../../../../domain/usecases/user/get-user-by-apikey';
import ApiMessageUtils from '../../../../domain/utils/api-message-utils';
import CreateStoryUC from '../../../../domain/usecases/stories/create-story-uc';
import DestroyStoryUC, { StoryNotFoundError } from '../../../../domain/usecases/stories/destroy-story-uc';

const UserStoriesRouter = express.Router();

UserStoriesRouter.get('/', async (req, res) => {
  const apikey = req.headers.apikey as string;
  try {
    const user = await new GetUserByApiKeyUC(db).execute({ apikey });
    const userId = await user.toJSON().id;

    const getStoriesFromUserUC = new GetStoriesFromUserUC(db);
    const result = (await getStoriesFromUserUC.execute({userId: userId})).map((e) => e.toJSON());

    res.status(201).json(result);
  } catch (e) {

    if (e instanceof UserNotFoundError) {
      res.status(404).json(ApiMessageUtils.notFound('User'));
      return;
    }
    LoggerUtils.e('UserStoriesRouter: get stories/', { e });
    res.sendStatus(500);
  }
});


UserStoriesRouter.post('/', async (req, res) => {
  const apikey = req.headers.apikey as string;
  const {
    title, 
    description, 
    mediaType,
    mediaId
  } = req.body;

  try {
    const user = await new GetUserByApiKeyUC(db).execute({ apikey });
    const userId = await user.toJSON().id;

    const createStoryUC = new CreateStoryUC(db);
    const result = await createStoryUC.execute({
      userId,
      title, 
      description, 
      mediaType,
      mediaId
    });

    res.status(201).json(result.toJSON());
  } catch (e) {

    if (e instanceof UserNotFoundError) {
      res.status(404).json(ApiMessageUtils.notFound('User'));
      return;
    }
    LoggerUtils.e('UserStoriesRouter: post stories/', { e });
    res.sendStatus(500);
  }
});


UserStoriesRouter.delete('/:id/', async (req, res) => {
  const apikey = req.headers.apikey as string;
  const id = Number(req.params['id']);

  try {
    const user = await new GetUserByApiKeyUC(db).execute({ apikey });
    const userId = await user.toJSON().id;

    const destroyStoryUC = new DestroyStoryUC(db);
    await destroyStoryUC.execute({ id, userId });
    res.sendStatus(204);
  } catch (e) {
    if (e instanceof UserNotFoundError) {
      res.status(404).json(ApiMessageUtils.notFound('User'));
      return;
    }

    if (e instanceof StoryNotFoundError) {
      res.status(404).json(ApiMessageUtils.notFound('Story')); 
      return;
    }

    LoggerUtils.e(`UserStoriesRouter: delete stories/${id}`, { e });
    res.sendStatus(500);
  }
});
export default UserStoriesRouter;