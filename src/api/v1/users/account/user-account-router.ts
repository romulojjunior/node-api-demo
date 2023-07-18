import express from 'express';
import AuthenticateUserUC, { InvalidCredentialsError } from '../../../../domain/usecases/auth/authenticate-user-uc';
import db from '../../../../data/models';
import CreateApikeyUC from '../../../../domain/usecases/auth/create-apikey-uc';
import LoggerUtils from '../../../../domain/utils/logger-utils';
import ApiMessageUtils from '../../../../domain/utils/api-message-utils';
import CreateUserUC, { EmailUnavailableError } from '../../../../domain/usecases/user/create-user-uc';

const UserAccountRouter = express.Router();


UserAccountRouter.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    res.status(422).json(ApiMessageUtils.requiredField('email'));
    return;
  }

  if (!password) {
    res.status(422).json(ApiMessageUtils.requiredField('password'));
    return;
  }

  try {
    const authenticateUserUC = new AuthenticateUserUC(db);
    const user = await authenticateUserUC.execute({
      email,
      password
    });

    const userId = await user.toJSON();
    const createApiKeyUC = new CreateApikeyUC(db);
    const apikey = await createApiKeyUC.execute({ userId });
    const apikeyJSON = await apikey.toJSON();
    res.json({
      apikey: apikeyJSON.value
    });
  } catch (e) {
    if (e instanceof InvalidCredentialsError) {
      res.status(401).json(ApiMessageUtils.unauthorized());
    } else {
      LoggerUtils.e('AuthRouter: POST singin/', { e });
      res.sendStatus(500);
    }
  }
});


UserAccountRouter.post('/signup', async (req, res) => {
  const { name, email, password, passwordConf } = req.body;

  if (!name) {
    res.status(422).json(ApiMessageUtils.requiredField('name'));
    return;
  }

  if (!email) {
    res.status(422).json(ApiMessageUtils.requiredField('email'));
    return;
  }

  if (!password) {
    res.status(422).json(ApiMessageUtils.requiredField('password'));
    return;
  }

  if (!passwordConf) {
    res.status(422).json(ApiMessageUtils.requiredField('passwordConf'));
    return;
  }

  try {
    const createUserUC = new CreateUserUC(db);
    const user = await createUserUC.execute({
      name, email, password, passwordConf
    });

    res.json({
      userId: await (user.toJSON()).id,
    });
  } catch (e) {
    if (e instanceof InvalidCredentialsError) {
      res.status(401).json(ApiMessageUtils.unauthorized());
    }
    if (e instanceof EmailUnavailableError) {
      res.status(422).json(ApiMessageUtils.emailUnAvailable());
    }
     else {
      LoggerUtils.e('AuthRouter: POST singin/', { e });
      res.sendStatus(500);
    }
  }
});

export default UserAccountRouter;