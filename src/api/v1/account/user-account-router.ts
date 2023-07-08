import express from 'express';
import AuthenticateUserUC, { InvalidCredentialsError } from '../../../domain/usecases/auth/authenticate-user-uc';
import db from '../../../data/models';
import CreateApikeyUC from '../../../domain/usecases/auth/create-apikey-uc';
import LoggerUtils from '../../../domain/utils/logger-utils';
import ApiMessageUtils from '../../../domain/utils/api-message-utils';

class UserAccountRouter {

  create(): express.Router {
    const router = express.Router();

    router.post('/signin', async (req, res) => {
      const { email, password } = req.body;

      if (!email) {
        res.status(422).send(ApiMessageUtils.requiredField('email'));
        return;
      }

      if (!password) {
        res.status(422).send(ApiMessageUtils.requiredField('password'));
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
        const apikey = await createApiKeyUC.execute({userId});
        const apikeyJSON = await apikey.toJSON();
        res.json({
          apikey: apikeyJSON.value
        });
      } catch (e) {
        if (e instanceof InvalidCredentialsError) {
          res.status(401).send(ApiMessageUtils.unauthorized());
        } else {
          LoggerUtils.e('AuthRouter: POST singin/', { e });
          res.sendStatus(500);
        }
      }
    });

    return router;
  }
}

export default UserAccountRouter;