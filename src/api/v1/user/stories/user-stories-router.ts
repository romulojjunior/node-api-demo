import express from 'express';
import db from '../../../../data/models';
import LoggerUtils from '../../../../domain/utils/logger-utils';
import GetStoriesFromUserUC from '../../../../domain/usecases/stories/get-stories-from-user-uc';
import GetUserByApiKeyUC, { UserNotFoundError } from '../../../../domain/usecases/user/get-user-by-apikey';
import ApiMessageUtils from '../../../../domain/utils/api-message-utils';
import CreateStoryUC from '../../../../domain/usecases/stories/create-story-uc';
import { title } from 'process';
const UserStoriesRouter = express.Router();

UserStoriesRouter.get('/', async (req, res) => {
  const apikey = req.headers.apikey as string;
  try {
    const user = await new GetUserByApiKeyUC(db).execute({ apikey });
    const userId = await user.toJSON().id;

    const getStoriesFromUserUC = new GetStoriesFromUserUC(db);
    const result = (await getStoriesFromUserUC.execute({userId: userId})).map((e) => e.toJSON());

    res.json(result);
  } catch (e) {

    if (e instanceof UserNotFoundError) {
      res.status(404).json(ApiMessageUtils.notFound('User')); 
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

    const getStoriesFromUserUC = new CreateStoryUC(db);
    const result = (await getStoriesFromUserUC.execute({
      userId,
      title, 
      description, 
      mediaType,
      mediaId
    }));

    res.json(result.toJSON());
  } catch (e) {

    if (e instanceof UserNotFoundError) {
      res.status(404).json(ApiMessageUtils.notFound('User')); 
    }
    LoggerUtils.e('UserStoriesRouter: post stories/', { e });
    res.sendStatus(500);
  }
});
export default UserStoriesRouter;